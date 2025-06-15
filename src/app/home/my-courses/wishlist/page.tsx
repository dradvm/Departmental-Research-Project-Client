"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stack } from "@mui/material";
import { Button } from "components/Button/Button";
import Input from "components/Input/Input";
import { Heart, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  faHeart,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { motion } from "framer-motion";
import { useState } from "react";

function Course({ title, instructor }: { title: string; instructor: string }) {
  const [isFavorite, setFavorite] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFavorite = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setFavorite((prev) => !prev);
  };

  return (
    <Link href={"/"} className="group">
      <Stack className="gap-y-2">
        <div
          className="w-full h-44 relative"
          style={{ border: "1px solid #999" }}
        >
          <Image
            src={"/thumbnail.webp"}
            fill
            alt="props"
            className="object-cover"
          />
          <div className="absolute w-full h-full top-0 left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-100">
            <div className="w-full h-full bg-black opacity-50"></div>
            <motion.div
              initial={{ opacity: 0, y: 0, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 0, scale: 1 }}
              className="text-white absolute w-full h-full flex items-center justify-center top-0 left-0"
            ></motion.div>
          </div>
          {isLoading ? (
            <div className="absolute top-0 right-0 m-2 animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
          ) : (
            <div
              className="absolute top-0 right-0 text-white p-2 hover:text-slate-200"
              onClick={toggleFavorite}
            >
              {isFavorite ? (
                <FontAwesomeIcon icon={faHeart} fontSize={20} />
              ) : (
                <Heart size={20} />
              )}
            </div>
          )}
        </div>
        <Stack className="gap-y-1">
          <div className="font-medium text-base/5 line-clamp-2 max-h-10">
            {title}
          </div>
          <div className="text-slate-500 text-xs truncate">{instructor}</div>
          <div className="flex items-center space-x-1">
            <div className="text-yellow-700 font-medium text-sm">4,7</div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s, i) => {
                return (
                  <FontAwesomeIcon
                    key={s}
                    icon={i + 1 > 3 ? regularStar : solidStar}
                    className={`text-yellow-600`}
                    fontSize={8}
                  />
                );
              })}
            </div>
            <div className="text-sm">(3.123)</div>
          </div>
          <div className="text-xs text-slate-600">
            Tổng số 88 giờ {" · "} 646 bài giảng
          </div>
          <div className="font-medium">1.749.000 ₫</div>
        </Stack>
      </Stack>
    </Link>
  );
}

export default function WishListPage() {
  return (
    <Stack className="gap-y-8">
      <div className="flex items-center justify-end">
        <div className="flex space-x-3">
          <Input />
          <Button variant="primary" className="px-4 py-2">
            <Search size={16} />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-x-5 gap-y-3">
        {[
          "How to create an online",
          "How to create an online course: the official udemy course How to create an online course: the official udemy course",
          "How to create an online",
          "How to create an online course: the official udemy course How to create an online course: the official udemy course",
          "How to create an online",
          "How to create an online course: the official udemy course How to create an online course: the official udemy course",
          "How to create an online",
          "How to create an online course: the official udemy course How to create an online course: the official udemy course",
          "How to create an online",
          "How to create an online course: the official udemy course How to create an online course: the official udemy course",
        ].map((a, i) => {
          return <Course key={i} title={a} instructor={a} />;
        })}
      </div>
    </Stack>
  );
}
