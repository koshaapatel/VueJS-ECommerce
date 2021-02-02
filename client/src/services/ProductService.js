import Api from '@/services/Api';

export default {
    getProducts() {
       return Api().get('Products');
    },

    createProduct(product){
        return Api().post('Products', product);
    },

    postComment(comment){
        return Api().post('Comments', comment);
    },
    placeOrder(order){
        console.log('You bang')
        return Api().post('Orders', order);
    }
}