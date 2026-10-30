import api from "@/utils/axios";

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


function AIAnalytics({analyticsData}:AIAnalyticsProps) {

    const handleAnalytics = async ()=>{
        try {
            const response = await api.post("/api/ai/analytics", analyticsData)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
      
    </div>
  )
}

export default AIAnalytics
