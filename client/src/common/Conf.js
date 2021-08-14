// const BASEURL = "http://localhost:5000/api";
const BASEURL = "/api";

const show = (msg) => {
    if(msg.data == null){
        if(msg.msg == "SUCCESS"){
            return (
                <div className="alert alert-success text-center" role="alert">
                    {msg.msg}
                </div>
            )
        }
        else{
            return (
                <div className="alert alert-danger text-center" role="alert">
                    {msg.msg}
                </div>
            )

        }
    }
    else if(msg.msg == "SUCCESS"){
        return (
            <div className="alert alert-success text-center" role="alert">
                {msg.data}
            </div>
        )
    }
    else {
        return (
            <div className="alert alert-danger text-center" role="alert">
                {msg.data}
            </div>
        )
    }
}

export {
    BASEURL,
    show
};
