module.exports = function Cart(oldCart){
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item , id){
        console.log(item);
        console.log(id);
        var storeItem = this.items[id];
        console.log(storeItem)
        if(!storeItem){
            storeItem = this.items[id] = {item :item , qty : 0, pricre: 0};
        }
        storeItem.qty++;
        storeItem.pricre = storeItem.item.pricre *  storeItem.qty;
        this.totalQty++;
        this.totalPrice += storeItem.pricre;
    }
    this.generateArray = function(){
        var arr=[];
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    };
};