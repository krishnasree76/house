import { ArrowLeft, Package, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const mockOrders = [
  { id: "HON-2847", date: "Mar 15, 2026", status: "Delivered", items: 2, total: 4698 },
  { id: "HON-2831", date: "Mar 8, 2026", status: "In Transit", items: 1, total: 2499 },
  { id: "HON-2790", date: "Feb 22, 2026", status: "Delivered", items: 3, total: 8497 },
];

const Orders = () => (
  <div className="min-h-screen pastel-gradient-animated">
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to Shop
      </Link>

      <h1 className="text-2xl font-semibold tracking-tight mb-8">My Orders</h1>

      <div className="flex flex-col gap-4">
        {mockOrders.map((order, i) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="glass rounded-2xl p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-sm font-semibold">{order.id}</span>
                <p className="text-xs text-muted-foreground mt-0.5">{order.date}</p>
              </div>
              <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${order.status === "Delivered" ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"}`}>
                {order.status === "Delivered" ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                {order.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{order.items} item{order.items > 1 ? "s" : ""}</span>
              <span className="font-semibold">₹{order.total.toLocaleString()}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default Orders;
