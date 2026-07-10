import { createContext, useRef, useState } from "react";
import { toast } from "react-toastify";


export  const OrderContext = createContext()

const OrderProvider = ({children}) => {
    const [examID, setExamID] = useState(null)
    const [open, setOpen] = useState(true)
    const sidebarRef = useRef(null);
    const [cart, setCart] = useState([]);
    
    

    const addCart = (course) => {
        const exists = cart.find((item) => item.id === course.id);

        if (exists) {
            toast.error("This course is already in the cart.", "error");
            return;
        }

        setCart([...cart, course]);
        toast.success(`${course.course_name} Added to cart!`, "success");
    };


    const info = {
        examID,
        setExamID,
        open,
        setOpen,
        sidebarRef,
        cart,
        setCart,
        addCart
    }
    return (
        <OrderContext.Provider value={info} >
            {children}
        </OrderContext.Provider>
    );
};

export default OrderProvider;