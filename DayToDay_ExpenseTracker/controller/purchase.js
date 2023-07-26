const RazorPay = require('razorpay');

const Order = require('../model/order');

exports.premiumPurchase = async (req,res,next) =>  {
 try {
    var rzp = new RazorPay({
        key_id : 'rzp_test_cLuh08geiXFM4N',
        key_secret : 'qRulhx2zktkdO6aFMKZi0tCr'
    })

    const amount = 2500;
    rzp.orders.create({amount, currency:"INR"}, (err, order) => {
      if(err) {
        throw new Error(JSON.stringify(err));
      }

      req.user.createOrder({orderId : order.id, status: 'PENDING'}).then(() => {
        return res.status(201).json({order, key_id : rzp.key_id});
      })
      .catch(err =>{
        throw new Error(err)
      })
    })
 }
 catch(err) {
    console.log(err);
    res.status(403).json({
        error : {
            message : 'Something went wrong'
        }
    })
 }

}

exports.premiumTransaction = async (req, res, next) => {
    try{
        const {payment_id, order_id} = req.body;
        
        const promise1 =  Order.findOne({where : {orderId : order_id}})
        .then(order => {
            order.update({paymentId : payment_id, status : 'SUCCESSFUL'})
        })
    
       const promise2 = req.user.update({isPremium : true}).then(()=>{
                return res.status(200).json({
                    success : true,
                    message : 'Transaction successful'
                })
            })

            Promise.all([promise1, promise2]).then((values) => {
            console.log(values);
        })
    }

    catch(err){ 
     console.log(err);
    }
}

