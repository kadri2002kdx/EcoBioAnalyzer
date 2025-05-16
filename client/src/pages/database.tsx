import { useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import SearchPanel from "@/components/database/search-panel";
import DatabaseItem from "@/components/database/database-item";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type Category = "all" | "plants" | "trees" | "soils" | "ecosystems";
type Region = "all" | "north" | "south" | "east" | "west" | "highlands" | "desert";

export default function Database() {
  const { t } = useI18n();
  const [category, setCategory] = useState<Category>("all");
  const [region, setRegion] = useState<Region>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  
  const regionMapping = {
    all: "كل الجزائر",
    north: "الشمال",
    south: "الجنوب",
    east: "الشرق",
    west: "الغرب",
    highlands: "الهضاب العليا",
    desert: "الصحراء"
  };
  
  const categoryMapping = {
    all: "جميع الفئات",
    plants: "نباتات",
    trees: "أشجار",
    soils: "أنواع التربة",
    ecosystems: "أنظمة بيئية"
  };

  // Function to determine which API to query based on the selected category
  const getQueryEndpoint = () => {
    if (category === "soils") {
      return '/api/database/soil-types';
    } else if (category === "ecosystems") {
      return '/api/database/ecosystems';
    } else {
      return '/api/database/plant-species';
    }
  };

  // Construct query params
  const getQueryParams = () => {
    const params = new URLSearchParams();
    
    if (region !== "all") {
      params.append('region', regionMapping[region]);
    }
    
    if (search) {
      params.append('search', search);
    }
    
    if (category !== "all" && category !== "soils" && category !== "ecosystems") {
      params.append('category', categoryMapping[category]);
    }
    
    return params.toString();
  };

  // Fetch database items
  const { data: databaseItems = [], isLoading } = useQuery({
    queryKey: [getQueryEndpoint(), getQueryParams()],
  });

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    setPage(1);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory as Category);
    setPage(1);
  };

  const handleRegionChange = (newRegion: string) => {
    setRegion(newRegion as Region);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  // Pagination logic - show 6 items per page
  const itemsPerPage = 6;
  const displayedItems = databaseItems.slice(0, page * itemsPerPage);
  const hasMore = displayedItems.length < databaseItems.length;

  return (
    <>
      <Helmet>
        <title>{t('seo.database.title')}</title>
        <meta name="description" content={t('seo.database.description')} />
      </Helmet>
      
      <section id="database" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 font-cairo">{t('database.title')}</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            {t('database.description')}
          </p>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <SearchPanel 
              onSearch={handleSearch}
              onCategoryChange={handleCategoryChange}
              onRegionChange={handleRegionChange}
              category={category}
              region={region}
              search={search}
            />
            
            <div className="p-6">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array(6).fill(0).map((_, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <Skeleton className="w-full h-44" />
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <Skeleton className="h-6 w-24" />
                          <Skeleton className="h-5 w-16" />
                        </div>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4 mb-3" />
                        <div className="flex justify-between">
                          <Skeleton className="h-4 w-28" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : displayedItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedItems.map((item: any) => (
                    <DatabaseItem key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">{t('database.noResults')}</p>
                </div>
              )}
              
              {hasMore && !isLoading && (
                <div className="mt-8 flex justify-center">
                  <Button 
                    onClick={handleLoadMore}
                    className="px-6 py-3 bg-white border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition"
                  >
                    {t('database.loadMore')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
