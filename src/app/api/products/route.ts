import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function GET(){
    const datas = await prisma.products.findMany()
    return Response.json(
        {
            'message' : 'success',
            'data' : datas
        }
    )
}

export async function POST(request: Request){
    try{
       const {
            name, price, description, userId, category
        } = await request.json()
        const priceFloat = Number(price)  
        
        // check user account
        const userOwner = await prisma.user.findUnique({where : {id: userId}})
        if(userOwner == null){
            throw new Error("no user account with this userId")
        }
        if(userOwner.role != "shop"){
            throw new Error("user is not regiuster as shop")
        }

        // [todo] : handle category in create
       
        const newProduct = await prisma.products.create({
            data : {
                name, price : priceFloat, description,
            }
        }) 
        return Response.json({
            "message" : "success",
            "data" : newProduct
        })
    } catch (error : Error | unknown){
        let errorMessage = ""
        if(error instanceof Error){
            errorMessage = error.message
        }
        
        return Response.json({
            "message" : "fail",
            "error" : errorMessage
        })
    }
}