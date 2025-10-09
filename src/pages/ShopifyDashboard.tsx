import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { 
  verifyShopifyConnection, 
  getShopInfo, 
  getShopifyProducts,
  ShopifyProduct 
} from "@/lib/shopify";
import { Store, Package, CheckCircle, XCircle, RefreshCw } from "lucide-react";

const ShopifyDashboard = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [shopInfo, setShopInfo] = useState<any>(null);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const testConnection = async () => {
    setIsRefreshing(true);
    try {
      const connected = await verifyShopifyConnection();
      setIsConnected(connected);

      if (connected) {
        const info = await getShopInfo();
        setShopInfo(info);
        
        const productsData = await getShopifyProducts();
        setProducts(productsData);

        toast({
          title: "Connected to Shopify",
          description: `Successfully connected to ${info.name}`,
        });
      } else {
        toast({
          title: "Connection Failed",
          description: "Could not connect to Shopify. Please check your credentials.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Connection test failed:", error);
      setIsConnected(false);
      toast({
        title: "Connection Error",
        description: error instanceof Error ? error.message : "Failed to connect to Shopify",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Shopify Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your Shopify store integration
              </p>
            </div>
            <Button 
              onClick={testConnection} 
              disabled={isRefreshing}
              variant="outline"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {/* Connection Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Connection Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  {isConnected ? (
                    <>
                      <CheckCircle className="h-8 w-8 text-green-500" />
                      <div>
                        <div className="font-medium">Connected</div>
                        <div className="text-sm text-muted-foreground">
                          Your Shopify store is connected and working
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-8 w-8 text-destructive" />
                      <div>
                        <div className="font-medium">Not Connected</div>
                        <div className="text-sm text-muted-foreground">
                          Failed to connect to Shopify. Check your credentials in Lovable Cloud secrets.
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Shop Info Card */}
          {shopInfo && (
            <Card>
              <CardHeader>
                <CardTitle>Store Information</CardTitle>
                <CardDescription>Details about your Shopify store</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Store Name</div>
                    <div className="font-medium">{shopInfo.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-medium">{shopInfo.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Domain</div>
                    <div className="font-medium">{shopInfo.domain}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Currency</div>
                    <div className="font-medium">{shopInfo.currency}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Plan</div>
                    <div className="font-medium">{shopInfo.plan_display_name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Location</div>
                    <div className="font-medium">{shopInfo.city}, {shopInfo.country_name}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Products Card */}
          {products.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Products ({products.length})
                </CardTitle>
                <CardDescription>Your Shopify product catalog</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.slice(0, 10).map((product) => (
                    <div 
                      key={product.id} 
                      className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent transition-colors"
                    >
                      {product.image && (
                        <img 
                          src={product.image.src} 
                          alt={product.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <div className="font-medium">{product.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {product.vendor} • {product.product_type}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                          {product.status}
                        </Badge>
                        {product.variants[0] && (
                          <div className="font-medium">
                            ${product.variants[0].price}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {products.length > 10 && (
                    <div className="text-center text-sm text-muted-foreground pt-2">
                      Showing 10 of {products.length} products
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* No Products Message */}
          {isConnected && products.length === 0 && !isLoading && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <div className="text-lg font-medium mb-2">No Products Found</div>
                <div className="text-sm text-muted-foreground">
                  Your Shopify store doesn't have any products yet.
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShopifyDashboard;
