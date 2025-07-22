"use client";

import withRole from "components/WithRole/withRole";
import GlobalPromotion from "./global/page";

function Promotion() {
  return <GlobalPromotion></GlobalPromotion>;
}

export default withRole(Promotion, ["ADMIN"]);