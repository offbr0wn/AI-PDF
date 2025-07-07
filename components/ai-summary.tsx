"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Crown, Lock, TrendingUp, Target, Lightbulb, FileText, Mail } from "lucide-react"

interface AISummaryData {
  overview: string
  keyInsights: string[]
  recommendations: string[]
  categoryBreakdown?: Record<string, number>
  travelTips?: string[]
  documentStructure?: string[]
}

interface AISummaryProps {
  data: AISummaryData
  isPro: boolean
  onUpgrade: () => void
}

export function AISummary({ data, isPro, onUpgrade }: AISummaryProps) {
  if (!isPro) {
    return (
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            AI Summary
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 border-yellow-200 ml-auto">
              <Crown className="h-3 w-3 mr-1" />
              Pro Feature
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-6 w-6 text-yellow-600" />
            </div>
            <h4 className="font-semibold text-slate-800 mb-2">Unlock AI-Powered Insights</h4>
            <p className="text-sm text-slate-600 mb-4">
              Get intelligent summaries, key insights, and personalized recommendations for your documents.
            </p>
            <Button
              onClick={onUpgrade}
              size="sm"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white gap-2"
            >
              <Crown className="h-4 w-4" />
              Upgrade to Pro
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-green-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          AI Summary
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-green-400 to-emerald-400 text-white border-none ml-auto"
          >
            <Crown className="h-3 w-3 mr-1" />
            Pro Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enhanced Pro Features Notice */}
        <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="h-4 w-4 text-green-600" />
            <span className="font-medium text-green-800">Enhanced AI Analysis Active</span>
            <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs ml-auto">
              Real-time
            </Badge>
          </div>
        </div>

        {/* Rest of the existing AI summary content remains the same */}
        {/* Overview */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Overview
          </h4>
          <p className="text-blue-700 text-sm leading-relaxed">{data.overview}</p>
        </div>

        {/* Key Insights */}
        <div className="p-4 bg-green-50 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
            <Target className="h-4 w-4" />
            Key Insights
          </h4>
          <ul className="space-y-2">
            {data.keyInsights.map((insight, index) => (
              <li key={index} className="text-green-700 text-sm flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                {insight}
              </li>
            ))}
          </ul>
        </div>

        {/* Category Breakdown (for receipts) */}
        {data.categoryBreakdown && (
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-3">Spending Breakdown</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(data.categoryBreakdown).map(([category, percentage]) => (
                <div key={category} className="flex justify-between items-center">
                  <span className="text-purple-700 text-sm">{category}:</span>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                    {percentage}%
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Travel Tips (for flight tickets) */}
        {data.travelTips && (
          <div className="p-4 bg-cyan-50 rounded-lg">
            <h4 className="font-semibold text-cyan-800 mb-3">Travel Tips</h4>
            <ul className="space-y-2">
              {data.travelTips.map((tip, index) => (
                <li key={index} className="text-cyan-700 text-sm flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Document Structure (for documents) */}
        {data.documentStructure && (
          <div className="p-4 bg-indigo-50 rounded-lg">
            <h4 className="font-semibold text-indigo-800 mb-3">Document Structure</h4>
            <div className="grid grid-cols-1 gap-1">
              {data.documentStructure.map((section, index) => (
                <div key={index} className="text-indigo-700 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-indigo-500 rounded-full"></span>
                  {section}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div className="p-4 bg-amber-50 rounded-lg">
          <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Recommendations
          </h4>
          <ul className="space-y-2">
            {data.recommendations.map((recommendation, index) => (
              <li key={index} className="text-amber-700 text-sm flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                {recommendation}
              </li>
            ))}
          </ul>
        </div>

        {/* Pro Export Options */}
        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">Export AI Summary</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1 text-xs">
                <FileText className="h-3 w-3" />
                PDF
              </Button>
              <Button variant="outline" size="sm" className="gap-1 text-xs">
                <Mail className="h-3 w-3" />
                Email
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
