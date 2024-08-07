import { CreateButton } from "./components/button";
import ContactTable from "./components/contactTable";

export default function Home() {
  return (
      <div className="max-w-screen-md mx-auto">
        <h1 className="text-white text-2xl font-semibold mt-2 mb-5">Contact</h1>
        <div className="flex justify-end mt-2 items-center mb-5 gap-1">
          <CreateButton/>
        </div>
        <ContactTable/>
      </div>
  );
}
