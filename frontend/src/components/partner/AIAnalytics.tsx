import api from "@/utils/axios";
import { RefreshCw, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface AnalyticsData {
    partner: {
        id: string;
        name: string;
    };

    summary: {
        totalRevenue: number;
        totalSales: number;
        totalProducts: number;
    };

    products: {
        id: string;
        title: string;
        type: string;
        price: number;
        totalSales: number;
        totalRevenue: number;
    }[];

    orders: {
        productTitle: string;
        partnerAmount: number;
        createdAt: string;
    }[];
}

interface AIAnalyticsProps{
    analyticsData:AnalyticsData
}


type InsightType = "positive" | "warning" | "neutral";

interface AIAnalyticsResponse {
  summary: AnalyticsData["summary"];

  charts: {
    productPerformance: {
      productId: string;
      product: string;
      sales: number;
      revenue: number;
    }[];

    salesTrend: {
      date: string;
      sales: number;
    }[];
  };

  ai:{
    summary: string;

    insights: {
        type:InsightType;
        title:string;
        description:string;
    }[];

    recommendations: string[];

    topProduct:{
        title:string;
        reason:string;
    };

    growthOpportunity:string;
  };
}



function AIAnalytics({analyticsData}:AIAnalyticsProps) {
    const [aiResponse, setAIResponse] = useState<AIAnalyticsResponse | null>(null);

    const [cached,setCached] = useState(false);

    const [expiresIn, setExpiresIn] = useState<number | null>(null);

    const[loading,setLoading] = useState(false)

    const handleAnalytics = async ()=>{
        setLoading(true)
        try {
            const response = await api.post("/api/ai/analytics", analyticsData)
            setAIResponse(response.data.data)

            setCached(response.data.cached)

            setExpiresIn(response.data.expiresIn)

            if(response.data.cached){
                toast.success("Latest AI analytics loaded")
            }
            else {
                toast.success("AI analytics generated successfully")
            }

            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error("Failed to generate AI analytics")
            setLoading(false)
        }
    }

    const getCachedTime = ()=>{
        if(expiresIn === null || expiresIn <= 0){
            return null;
        }
        const minutes = Math.ceil(expiresIn/60);
        return `${minutes} mins`
    }

  return (
    <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-600"/>
                    <h3 className="font-semibold text-slate-900">AI Analytics</h3>
                    {aiResponse && <Badge className="bg-indigo-50 text-indigo-700 hover:bg-indigo-50 uppercase">Powered by Groq</Badge>}
                </div>
                <p className="text-sm text-slate-500 mt-1">Get AI-powered insights about your sales, products and growth.</p>
            </div>

            <Button onClick={handleAnalytics} className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto">
                {
                    loading ? (
                        <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin"/>
                        Analyzing...
                        </>
                    ) : (
                        <>
                        <Sparkles className="h-4 w-4 mr-2"/>
                        Check AI Analytics
                        </>
                    )
                }
            </Button>
        </div>

        {cached && <p className="text-xs text-slate-400">Showing cached analytics. New data will be generated after{" "}
        <span className="font-medium text-slate-600">{getCachedTime()}</span>    
        </p>}


        {!aiResponse && !loading && 
        (<Card className="border-dashed">
            <CardContent className="py-10 text-center">
                <Sparkles className="h-8 w-8 mx-auto text-indigo-500 mb-3"/>
                <p className="font-medium text-slate-900">Ready to analyze your store</p>
                <p className="text-sm text-slate-500 mt-1">
                    Click &quot;Check AI Analytics&quot; to get AI-powered insights.
                </p>
            </CardContent>
        </Card>)
        }


        {aiResponse && (
            <div className="space-y-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">
                                Sales Trend
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={240}>
                                <BarChart data={aiResponse.charts.salesTrend}>
                                    <defs>
                                        <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#4f46e5" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#a5b4fc" stopOpacity={1} />
                                        </linearGradient>
                                    </defs>

                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false}/>

                                    <XAxis dataKey="date" tick={{fontSize:11, fill:"#64748b"}}/>
                                    <YAxis allowDecimals={false} tick={{fontSize:11, fill:"#64748b"}}/>

                                    <Tooltip/>
                                    <Bar dataKey="sales" fill="url(#salesGradient)" radius={[6,6,0,0]} maxBarSize={48}/>

                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">
                                Product Performance
                            </CardTitle>
                            <CardContent>
                            <ResponsiveContainer width="100%" height={240}>
                                <BarChart data={aiResponse.charts.productPerformance}
                                layout="vertical"
                                margin={{left:20, right:20}}
                                >
                                    <defs>
                                        <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#4f46e5" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#a5b4fc" stopOpacity={1} />
                                        </linearGradient>
                                    </defs>

                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false}/>

                                    <XAxis type="number" tick={{fontSize:11, fill:"#64748b"}}/>

                                    <YAxis type="category" dataKey="product" width={120} tick={{fontSize:11, fill:"#64748b"}}/>

                                    <Tooltip/>
                                    <Bar dataKey="revenue" fill="url(#salesGradient)" radius={[0,6,6,0]} maxBarSize={48}/>

                                </BarChart>
                            </ResponsiveContainer>
                            </CardContent>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        )}



      
    </div>
  )
}

export default AIAnalytics
