import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { auth } from "auth";

library.add(fas, far, fab);
export default async function Home() {
  return (
    <>
      <h1>Day la trang chinh</h1>
    </>
  );
}
