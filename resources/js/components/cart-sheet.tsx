import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { router, usePage } from "@inertiajs/react";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { route } from 'ziggy-js';
import { Ziggy } from '../ziggy'; 
export function CartSheet() {
   
    const { cartItems = [], cartCount = 0 } = usePage().props as any;
    const { auth } = usePage().props as any;
   
    const cartTotal = cartItems?.reduce((total: number, item: any) => {
        return total + (item.product.price * item.quantity);
    }, 0) || 0;

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity < 1) return;
        router.put(`/cart/${id}`, { quantity }, {
            preserveScroll: true,
            onSuccess: () => toast.success("Quantity updated")
        });
    };

    const removeItem = (id: number) => {
    
    router.delete(`/cart/${id}`, {
        preserveScroll: true,
        onSuccess: () => toast.success("Removed from cart"),
    });
};

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
                <SheetHeader>
                    <SheetTitle className="text-2xl font-bold border-b pb-4">Your Shopping Cart</SheetTitle>
                </SheetHeader>
                
                <div className="flex-1 mt-6 space-y-6 overflow-y-auto pr-2">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">Your cart is empty.</div>
                    ) : (
                        cartItems.map((item: any) => (
                            <div key={item.id} className="flex gap-4 border-b pb-4">
                                <div className="h-20 w-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                    <img src={item.product.image_url} className="object-cover w-full h-full" alt={item.product.name} />
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-gray-800">{item.product.name}</h4>
                                        <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <p className="text-indigo-600 font-semibold mt-1">${item.product.price}</p>

                                    <div className="flex items-center gap-3 mt-3">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-md border hover:bg-gray-100">
                                            <Minus size={14} />
                                        </button>
                                        <span className="font-medium w-8 text-center">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-md border hover:bg-gray-100">
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="pt-6 bg-white border-t">
                        <div className="flex justify-between text-xl font-bold mb-4">
                            <span>Total:</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <Button className="w-full py-6 text-lg">Proceed to Checkout</Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}