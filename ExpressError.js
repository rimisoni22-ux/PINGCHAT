class ExpressError extends Error{
    constructor(status,messsage){
        super();
        this.status = status;
        this.message = message;
    }
}
module.exports= ExpressError;
