import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5174";
  try {
    // Crear una nueva orden con los datos enviados por el frontend
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    // Guardar la nueva orden en la base de datos
    await newOrder.save();

    // Vaciar el carrito del usuario una vez que la orden se ha registrado
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Enviar respuesta de éxito al frontend
    res.json({
      success: true,
      message: "Orden registrada satisfactoriamente",
      orderId: newOrder._id,
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error al registrar orden",
    });
  }
};

// verify order
const verifyOrder = async(req,res)=>{
  const {orderId,success} = req.body;
  try {
    if(success=="true"){
      await orderModel.findByIdAndUpdate(orderId,{payment:true});
      res.json({success:true,message:"Pagado"})
    }else{
      await orderModel.findByIdAndDelete(orderId)
      res.json({success:false,message:"No pagado"})
    }
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
  }
}


// user orders for frontend
const userOrders = async (req,res)=>{
  try {
    const orders = await orderModel.find({userId:req.body.userId})
    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
  }
}

// listing orders for admin panel
const listOrders = async(req,res)=>{
  try {
    const orders = await orderModel.find({});
    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
  }
}

// api for updating order status
const updateStatus = async (req,res)=>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"Status Updated"})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
  }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
