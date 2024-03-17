import { CreationBottomBar } from "../components/CreationBottomBar";
import Navbar from "../components/NavBar";

export default async function Extend() {
  return (
    <div className="relative  flex h-fit flex-col overflow-auto overflow-x-hidden bg-background text-foreground container mx-auto px-5 lg:px-10 ">
      <Navbar />

      <form>
        <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-10 md:mb-15">
          <div className="flex flex-col gap-y-2">
            <label>Upload Video</label>
            <input
              type="file"
              accept="video/*" // Only accept video files
              name="video"
              required
            />
          </div>
        </div>
        <CreationBottomBar />
      </form>
    </div>
  );
}
