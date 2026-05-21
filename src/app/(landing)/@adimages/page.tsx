import {
  getLandscapeAdBannerImages,
  getPortraitAdBannerImages,
} from "@/actions/news";
import AdImages from "@/components/custom/ad-images";

export default async function Page() {
  const { data: wideData } = await getLandscapeAdBannerImages();
  const { data: tallData } = await getPortraitAdBannerImages();

  return <AdImages wideData={wideData} tallData={tallData} />;
}
