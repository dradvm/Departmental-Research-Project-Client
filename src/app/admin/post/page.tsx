"use client";
import { PostType } from "types/post";
import { useState } from "react";
import { posts } from "app/data";
export default function Post() {
  const [selectedItem, setSelectedItem] = useState<number>();
  const [selectedPost, setSelectedPost] = useState<PostType>();
  return (
    <div>
      <div className="h-[500px] flex justify-evenly flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-[40%] overflow-y-auto">
          <h1>Danh sách các bài đăng khóa học</h1>
          <ul>
            {posts.map((post, index) => {
              return (
                <li
                  key={index}
                  className={`px-6 py-2 border-b hover:underline cursor-pointer
                           ${
                             post.idCourse === selectedItem ? "bg-blue-100" : ""
                           }`}
                  onClick={() => {
                    if (post.idCourse !== selectedItem) {
                      setSelectedPost(post);
                      setSelectedItem(post.idCourse);
                    }
                  }}
                >
                  {post.title}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="w-full lg:w-[50%]">
          {selectedPost && (
            <div>
              <h1>{selectedPost.title}</h1>
              <p>{selectedPost.subTitle}</p>
              <p>Mô tả khóa học: {selectedPost.description}</p>
              <p>Học phí: {selectedPost.price}</p>
              <p>
                Trạng thái duyệt:{" "}
                {selectedPost.isAccept ? "Đã duyệt" : "Chưa duyệt"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
