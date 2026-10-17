import proxy from "express-http-proxy"
import { Request } from "express"

export const proxyWithHeader = (serverUrl:string)=>{
    return proxy(
        serverUrl,{
            proxyReqOptDecorator:(proxyReqOpts, srcReq:Request)=>{
                if(srcReq.user){
                    proxyReqOpts.headers={
                        ...proxyReqOpts.headers,
                        "x-user-id":srcReq.user.userId.toString()
                    }
                }

                return proxyReqOpts
            },
        }
    )
}