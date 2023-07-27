const RazorPay = require('razorpay');

const sequelize = require('../util/database');
const Order = require('../model/order');

const premiumPurchase = async (req,res,next) =>  {
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

const premiumTransaction = async (req, res, next) => {
    try{
        const t = await sequelize.transaction();
      
        const {payment_id, order_id} = req.body;
        
        const promise1 =  Order.findOne({where : {orderId : order_id}, transaction: t})
        .then(async (order) => {
            await t.commit();
            order.update({paymentId : payment_id, status : 'SUCCESSFUL'})
        })
        .catch(async(err) => {
            await t.rollback();
            console.log(err);
        })
    
       const promise2 = req.user.update({isPremium : true},{transaction: t}).then(async()=>{
                await t.commit();
                // return res.status(200).json({
                //     success : true,
                //     message : 'Transaction successful'
                // })
                 console.log('Transaction Successfull');
            })
            
        .catch(async(err) => {
          await t.rollback();
          console.log(err);
      })

            Promise.all([promise1, promise2]).then((values) => {
            console.log(values);
        })
    }

    catch(err){ 
     console.log(err);
    }
}

module.exports = {
  premiumPurchase,
  premiumTransaction
}
