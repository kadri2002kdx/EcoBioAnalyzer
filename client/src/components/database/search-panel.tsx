import { useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface SearchPanelProps {
  onSearch: (searchTerm: string) => void;
  onCategoryChange: (category: string) => void;
  onRegionChange: (region: string) => void;
  category: string;
  region: string;
  search: string;
}

export default function SearchPanel({
  onSearch,
  onCategoryChange,
  onRegionChange,
  category,
  region,
  search
}: SearchPanelProps) {
  const { t } = useI18n();
  const [searchTerm, setSearchTerm] = useState(search);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="p-6 border-b border-gray-200">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-2">
            <label className="block text-gray-700 mb-2">{t('database.search.searchLabel')}</label>
            <div className="flex">
              <Input
                type="text"
                className="w-full border border-gray-300 rounded-r-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder={t('database.search.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button 
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-l-lg hover:bg-primary-dark transition"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">{t('database.search.categoryLabel')}</label>
            <Select 
              value={category} 
              onValueChange={onCategoryChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('database.search.allCategories')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('database.search.allCategories')}</SelectItem>
                <SelectItem value="plants">{t('database.search.plants')}</SelectItem>
                <SelectItem value="trees">{t('database.search.trees')}</SelectItem>
                <SelectItem value="soils">{t('database.search.soils')}</SelectItem>
                <SelectItem value="ecosystems">{t('database.search.ecosystems')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">{t('database.search.regionLabel')}</label>
            <Select 
              value={region} 
              onValueChange={onRegionChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('database.search.allRegions')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('database.search.allRegions')}</SelectItem>
                <SelectItem value="north">{t('database.search.north')}</SelectItem>
                <SelectItem value="south">{t('database.search.south')}</SelectItem>
                <SelectItem value="east">{t('database.search.east')}</SelectItem>
                <SelectItem value="west">{t('database.search.west')}</SelectItem>
                <SelectItem value="highlands">{t('database.search.highlands')}</SelectItem>
                <SelectItem value="desert">{t('database.search.desert')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>
    </div>
  );
}
