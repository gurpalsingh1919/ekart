
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '../layouts/app-layout';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
    ShoppingCart, 
    Trash2,   // <--- Add this
    Plus,     // <--- Add this
    Minus     // <--- Add this
} from 'lucide-react';
import { route } from 'ziggy-js';

export default function Welcome({ products = [], cartItems = [] }: any) {
    // Get auth and cartCount from the global shared props
    const { auth, cartCount } = usePage().props as any;
    const { props } = usePage();
    console.log('All Inertia Props:', props);
    /*const handleAddToCart = (id: number) => {
        if (!auth.user) return router.get('/login');
        
        router.post('/cart', { product_id: id, quantity: 1 }, {
            preserveScroll: true
        });
    };*/

    const handleAddToCart = (id: number) => {
        if (!auth.user) return router.get('/login');

         router.post('/cart', { product_id: id, quantity: 1 }, {
            preserveScroll: true,
            onSuccess: () => {
                //console.log('1')
                // Trigger the sticky message
                toast.success('Product added to cart!', {
                    description: 'We have updated your shopping bag.',
                    duration: 3000,
                });
            },
            onError: () => {
                toast.error('Failed to add product. Please try again.');
            }
        });
    };

    // For Deleting
    const removeItem = (id: number) => {
        router.delete(route('cart.destroy', id), {
            onSuccess: () => toast.info('Item removed from cart'),
        });
    };

    // For Updating
    const updateQuantity = (id: number, qty: number) => {
        router.put(route('cart.update', id), { quantity: qty }, {
            onSuccess: () => toast.success('Quantity updated'),
        });
    };
    const cartTotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    return (
        <AppLayout>
            <h2 className="text-3xl font-bold mb-8">All Products</h2>
            <div className="py-8 px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                            <div key={product.id} className="group bg-white rounded-2xl shadow-sm overflow-hidden border">
                                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                                    <img 
                                        src={product.image_url} 
                                        alt={product.name} 
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                                    />
                                </div>
                                <div className="p-5">
                                    <h2 className="text-lg font-bold">{product.name}</h2>
                                    <p className="text-indigo-600 font-bold">${product.price}</p>
                                    <p className="ext-3xl">Stock: {product.stock_quantity}</p>
                                    <Button onClick={() => handleAddToCart(product.id)} className="btn w-full mt-4">
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </AppLayout>
    );
}