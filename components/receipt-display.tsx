import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Store, CreditCard } from "lucide-react"

interface ReceiptData {
  merchant: {
    name: string
    address: string
    phone: string
    email: string
  }
  transaction: {
    date: string
    time: string
    amount: number
    currency: string
    paymentMethod: string
    transactionId: string
  }
  items: Array<{
    name: string
    quantity: number
    price: number
    category: string
  }>
  tax: number
  subtotal: number
}

interface ReceiptDisplayProps {
  data: ReceiptData
}

export function ReceiptDisplay({ data }: ReceiptDisplayProps) {
  const getCategoryColor = (category: string) => {
    const colors = {
      Produce: "bg-green-100 text-green-700",
      Dairy: "bg-blue-100 text-blue-700",
      Meat: "bg-red-100 text-red-700",
      Bakery: "bg-yellow-100 text-yellow-700",
      Pantry: "bg-purple-100 text-purple-700",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700"
  }

  return (
    <div className="space-y-6">
      {/* Merchant Information */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Store className="h-5 w-5" />
            Merchant Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-semibold text-slate-800">{data.merchant.name}</h4>
            <p className="text-sm text-slate-600">{data.merchant.address}</p>
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <span className="text-slate-600">Phone: {data.merchant.phone}</span>
            <span className="text-slate-600">Email: {data.merchant.email}</span>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Details */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Transaction Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-600">Date:</span>
              <p className="font-medium text-slate-800">{data.transaction.date}</p>
            </div>
            <div>
              <span className="text-slate-600">Time:</span>
              <p className="font-medium text-slate-800">{data.transaction.time}</p>
            </div>
            <div>
              <span className="text-slate-600">Payment:</span>
              <p className="font-medium text-slate-800">{data.transaction.paymentMethod}</p>
            </div>
            <div>
              <span className="text-slate-600">Transaction ID:</span>
              <p className="font-medium text-slate-800 truncate">{data.transaction.transactionId}</p>
            </div>
          </div>
          <div className="pt-3 border-t border-slate-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-slate-800">Total Amount:</span>
              <span className="text-2xl font-bold text-green-600">
                ${data.transaction.amount.toFixed(2)} {data.transaction.currency}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items Purchased */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Items Purchased ({data.items.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-slate-800">{item.name}</h4>
                    <Badge variant="secondary" className={`text-xs ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-800">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Receipt Summary */}
          <div className="mt-6 pt-4 border-t border-slate-200 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Subtotal:</span>
              <span className="font-medium text-slate-800">${data.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Tax:</span>
              <span className="font-medium text-slate-800">${data.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold pt-2 border-t border-slate-200">
              <span className="text-slate-800">Total:</span>
              <span className="text-green-600">${data.transaction.amount.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
