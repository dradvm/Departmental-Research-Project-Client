"use client";

import { useEffect, useState } from "react";
import { Pagination } from "components/AdminUtils/Pagination";
import NoDataFound from "components/AdminUtils/NoDataFound";
import courseService from "services/course.service";
import {
  CourseAdminFilter,
  CourseAdminQueryType,
  CourseAdminUI,
  CourseResAdminUI,
} from "types/course";
import PostFilter from "components/AdminUtils/PostFilter";
import { PostItem } from "components/AdminUtils/PostItem";
import { Modal } from "@mui/material";
import PostDetailModal from "components/AdminUtils/PostDetailModal";
import { toast, ToastContainer } from "react-toastify";
import withRole from "components/WithRole/withRole";

function Post() {
  const [page, setPage] = useState<number>(1);
  const [infors, setInfors] = useState<CourseAdminUI[]>();
  const [selectedPost, setSelectedPost] = useState<CourseAdminUI>();
  const [dataLen, setDataLen] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<CourseAdminFilter>({
    minPrice: undefined,
    maxPrice: undefined,
    minLectureCount: undefined,
    maxLectureCount: undefined,
    minTime: undefined,
    maxTime: undefined,
    searchText: undefined,
  });

  // open/ close modal
  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  // filter change
  function onChangeFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPage(1);
    setFilter((preFilter) => ({
      ...preFilter,
      [name]: value,
    }));
  }

  // get data with page and filter
  const limit = 4;

  async function fetchData(page: number, filter: CourseAdminFilter) {
    const skip = (page - 1) * limit;
    const req: CourseAdminQueryType = {
      limit,
      skip,
      minPrice: filter.minPrice ? parseInt(filter.minPrice) : undefined,
      maxPrice: filter.maxPrice ? parseInt(filter.maxPrice) : undefined,
      minLectureCount: filter.minLectureCount
        ? parseInt(filter.minLectureCount)
        : undefined,
      maxLectureCount: filter.maxLectureCount
        ? parseInt(filter.maxLectureCount)
        : undefined,
      minTime: filter.minTime ? parseInt(filter.minTime) * 3600 : undefined,
      maxTime: filter.maxTime ? parseInt(filter.maxTime) * 3600 : undefined,
      searchText: filter.searchText ? filter.searchText : undefined,
    };
    const dataRespone: CourseResAdminUI = (
      await courseService.getAllCourse(req)
    ).data;
    setDataLen(dataRespone.length);
    setInfors(dataRespone.courses);
  }

  useEffect(() => {
    fetchData(page, filter);
  }, [page, filter]);

  // accept a course
  async function acceptCourse(courseId: number) {
    try {
      if (confirm(`Xác nhận duyệt khóa học này?`)) {
        await courseService.acceptCourse(courseId);
        await fetchData(page, filter);
        toast.success("Duyệt khóa học thành công!", { autoClose: 2000 });
      }
    } catch (e) {
      console.log("Lỗi duyệt khóa học thất bại: ", e);
      toast.error("Xảy ra lỗi khi duyệt khóa học", { autoClose: 2000 });
    }
  }

  return (
    <div className="h-[600px] mt-4 flex flex-col gap-4">
      {/* Block 1: Filter Utility */}
      <PostFilter filter={filter} onChangeFilter={onChangeFilter}></PostFilter>
      {/* Block 2: Content */}
      {!infors || infors.length === 0 ? (
        <NoDataFound message="Không có bài đăng"></NoDataFound>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {infors.map((post) => (
            <PostItem
              key={post.courseId}
              post={post}
              handleOpen={handleOpen}
              setSelectedPost={setSelectedPost}
              acceptCourse={acceptCourse}
            />
          ))}
        </div>
      )}
      {/* Block 3: Button Pagination */}
      <div className="flex items-center justify-around">
        <Pagination
          page={page}
          setPage={setPage}
          dataLength={dataLen}
          limit={limit}
        ></Pagination>
      </div>
      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        {selectedPost ? (
          <PostDetailModal
            postDetail={selectedPost}
            handleClose={handleClose}
            acceptCourse={acceptCourse}
          />
        ) : (
          <h1>Không có bài đăng nào được chọn cả</h1>
        )}
      </Modal>
      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}

export default withRole(Post, ["ADMIN"]);