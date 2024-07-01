const router = require("express").Router();
const { authenticateToken } = require("./userAuth");
const Book = require("../modeles/book");
const Order = require("../modeles/order");
const User = require("../modeles/user")
//place order 
router.post("/place-order", authenticateToken, async (req, res) =>{
    try{
        const { id } = req.headers;
        const { order } = req.body;

        for (const orderData of order){
            const newOrder = new Order({ user: id, book: orderData._id});
            const orderDataFromDb = await newOrder.save();
            //saving order in user model 
            await User.findByIdAndUpdate(id,{
                $push: {orders: orderDataFromDb._id},
            });
        //clearing cart 
        await User.findByIdAndUpdate(id,{
            $pull: { cart: orderData._id},
        });
        }
        return res.json({
            status:"Success",
            message:"Order placed Successfully",
        });

    }catch(error){
        console.log(error);
         return res.status(500).json({ message:"An error occured"});
    }
});
router.get("/get-order-history", authenticateToken, async (req,res) =>{
    try{
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
          path: "orders",
          populate: { path: "book"},  
        });

        const orderData = userData.orders.reverse();
        return res.json({
            status: "Success",
            data:orderData,
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({ message:"An error occured"});
   }  
});

router.get("/get-all-orders", authenticateToken, async(req,res) =>{
    try{
        const userData = await Order.find()
        .populate({
            path: "book",
        })
        .sort({ createAt: -1})
        return res.json({
            status:"success",
            data: userData,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({ message:"An error occured"});
   
        
    }
});
router.put("/update-status/:id", authenticateToken, async (req,res) =>{
    try{
        const { id } = req.parms;
        await Order.findByIdAndUpdate(id, {status: req.body.status});
        return res.json({
            status:"Success",
            message: "Status Update successfully",
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({ message:"An error occured"});
    }
})
module.exports = router;

