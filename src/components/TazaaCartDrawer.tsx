import React, { useState } from 'react';
import { TazaaBrandProduct } from '../data/tazaaCatalog';
import { useLanguage } from '../i18n/LanguageContext';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  CheckCircle2,
  Leaf,
} from 'lucide-react';

export interface CartItem {
  product: TazaaBrandProduct;
  quantity: number;
}

interface TazaaCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const TazaaCartDrawer: React.FC<TazaaCartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}) => {
  const { formatMoney } = useLanguage();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalUsd = items.reduce((acc, curr) => acc + curr.product.priceUsd * curr.quantity, 0);
  const totalItemsCount = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const estimatedCarbonOffsetKg = Math.round(totalItemsCount * 1.85 * 10) / 10;

  const handleCompleteOrder = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      const orderRef = `TAZAA-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderConfirmed(orderRef);
      setIsCheckingOut(false);
      onClearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-slideLeft">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#1B5E20] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 leading-tight">
                Your Shopping Bag
              </h2>
              <span className="text-[11px] text-slate-500">
                {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} • Direct from Tazaa
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {orderConfirmed ? (
            <div className="p-8 text-center space-y-4 bg-emerald-50 rounded-3xl border border-emerald-200">
              <div className="w-16 h-16 rounded-full bg-[#1B5E20] text-[#00E676] flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-emerald-950">
                  Order Successfully Placed!
                </h3>
                <p className="text-xs text-emerald-800">
                  Order Reference: <span className="font-mono font-bold">{orderConfirmed}</span>
                </p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Thank you for choosing Tazaa circular products. Your order is being prepped in our clean facility and packed strictly in water-soluble cassava bio-wrap.
              </p>
              <button
                type="button"
                onClick={() => {
                  setOrderConfirmed(null);
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl bg-[#1B5E20] text-white font-black text-xs hover:bg-emerald-800 transition"
              >
                Continue Browsing
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-black text-sm text-slate-800">Your bag is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Explore Tazaa's proprietary Bio-Cups, molded tableware, and sustainable eco-plastics.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="p-3.5 rounded-2xl border border-slate-100 bg-white shadow-2xs flex items-center gap-3"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-200"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="font-black text-xs text-slate-900 truncate">
                      {product.name}
                    </h4>
                    <div className="text-[10px] text-slate-500">
                      {product.packUnit} • {formatMoney(product.priceUsd)} each
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(product.id, Math.max(1, quantity - 1))}
                          className="w-5 h-5 rounded bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50 text-xs"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="text-[11px] font-bold px-1.5">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(product.id, quantity + 1)}
                          className="w-5 h-5 rounded bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50 text-xs"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                      <span className="text-xs font-black text-slate-900">
                        {formatMoney(product.priceUsd * quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(product.id)}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-rose-600 transition"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {/* Carbon Offset Callout */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-900 flex items-center gap-2.5">
                <Leaf className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="leading-snug">
                  This order diverts approximately <strong>{estimatedCarbonOffsetKg} kg</strong> of petrochemical plastics from landfills.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Checkout */}
        {items.length > 0 && !orderConfirmed && (
          <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-slate-500">
                <span>Subtotal</span>
                <span>{formatMoney(totalUsd)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>Zero-Carbon Shipping</span>
                <span className="text-emerald-700 font-bold">Complimentary</span>
              </div>
              <div className="flex items-center justify-between text-sm font-black text-slate-900 border-t border-slate-200 pt-2">
                <span>Estimated Total</span>
                <span>{formatMoney(totalUsd)}</span>
              </div>
            </div>
            <button
              type="button"
              disabled={isCheckingOut}
              onClick={handleCompleteOrder}
              className="w-full py-3 rounded-2xl bg-[#1B5E20] hover:bg-emerald-800 text-white font-black text-xs transition shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{isCheckingOut ? 'Processing Direct Order...' : 'Complete Circular Order'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
