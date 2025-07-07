"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown, Check, Sparkles, Zap, Shield, Infinity } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"

interface ProUpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  onUpgrade: () => void
}

export function ProUpgradeModal({ isOpen, onClose, onUpgrade }: ProUpgradeModalProps) {
  const features = [
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Advanced AI Insights",
      description: "Get detailed summaries, recommendations, and smart analysis",
    },
    {
      icon: <Infinity className="h-5 w-5" />,
      title: "Unlimited Processing",
      description: "Process unlimited documents without monthly limits",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Priority Processing",
      description: "Faster document processing with priority queue access",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Advanced Security",
      description: "Enhanced encryption and secure document storage",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <Crown className="h-6 w-6 text-yellow-500" />
            Upgrade to Pro
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Free Plan */}
            <Card className="border-slate-200">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-slate-800">Free</h3>
                  <div className="text-3xl font-bold text-slate-800 mt-2">$0</div>
                  <p className="text-sm text-slate-600">per month</p>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />5 documents per month
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Basic text extraction
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Standard processing speed
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 relative">
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white">
                Recommended
              </Badge>
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-slate-800 flex items-center justify-center gap-2">
                    <Crown className="h-5 w-5 text-yellow-500" />
                    Pro
                  </h3>
                  <div className="text-3xl font-bold text-slate-800 mt-2">$19</div>
                  <p className="text-sm text-slate-600">per month</p>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Unlimited documents
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Advanced AI insights
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Priority processing
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Enhanced security
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Export in all formats
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Features List */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-800 text-center">What you&apos;ll get with Pro:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                    {feature.icon}
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-800">{feature.title}</h5>
                    <p className="text-sm text-slate-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Maybe Later
            </Button>
            <Button
              onClick={onUpgrade}
              className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white gap-2"
            >
              <Crown className="h-4 w-4" />
              Upgrade Now
            </Button>
          </div>

          <p className="text-xs text-slate-500 text-center">Cancel anytime. 30-day money-back guarantee.</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
