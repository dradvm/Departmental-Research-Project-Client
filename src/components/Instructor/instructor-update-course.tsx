"use client";

import { useEffect, useState } from "react";
import { PhotoIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { DocumentTextIcon } from "@heroicons/react/20/solid";
import { useUser } from "../../context/UserContext";
import ResponsiveEditor from "components/Editor/ResponsiveEditor";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import courseService from "services/course.service";
import withRole from "components/WithRole/withRole";

type CourseFormProps = {
  mode: "create" | "edit";
  courseData?: any; // dữ liệu khóa học từ backend khi chỉnh sửa
};

function CourseForm(props: CourseFormProps) {
  const { user } = useUser();

  const { mode, courseData } = props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirement, setRequirement] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [thumbnailName, setThumbnailName] = useState("");
  const [price, setPrice] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [targetAudience, setTargetAudience] = useState("");
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const [allCategories, setAllCategories] = useState<
    { categoryId: number; categoryName: string }[]
  >([]);

  useEffect(() => {
    if (
      mode === "edit" &&
      courseData &&
      sections.length === 1 &&
      sections[0].lectures.length === 1 &&
      sections[0].lectures[0].contents.length === 0
    ) {
      setDescription(courseData.description || "");
      setRequirement(courseData.requirement || "");
      setTargetAudience(courseData.targetAudience || "");
      setTitle(courseData.title || "");
      setSubTitle(courseData.subTitle || "");
      setPrice(courseData.price || "");
      setIsPublic(courseData.isPublic || false);
      setThumbnailName(courseData.thumbnail || "");

      setSections(
        courseData.Section.map((section: any, sIdx: number) => ({
          title: section.nameSection,
          newTitle: section.nameSection,
          isEditingTitle: false,
          showAddLecture: false,
          newLectureTitle: "",
          lectures: section.Lecture.map((lecture: any, lIdx: number) => ({
            title: lecture.nameLecture,
            newTitle: lecture.nameLecture,
            isEditing: false,
            contents: lecture.video
              ? [
                {
                  type: "video",
                  name: lecture.video.split("/").pop() || "Video",
                  file: null, // bạn có thể để null vì không có file gốc
                  url: lecture.video,
                  duration: lecture.time, //
                },
              ]
              : [],
          })),
        }))
      );
    }
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/categories");
        const data = await res.json();
        setAllCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
    if (mode === "edit" && courseData?.CourseCategory) {
      setCategoryIds(courseData.CourseCategory.map((cc: any) => cc.categoryId));
    }
  }, [mode, courseData]);

  const [errors, setErrors] = useState<{
    title: string;
    subTitle: string; //
    description: string;
    requirement: string; //
    targetAudience: string; //
    price: string;
    thumbnail: string;
    categories: string; //
    sections: { title: string; lectures: string[] }[];
  }>({
    title: "",
    subTitle: "", //
    description: "",
    requirement: "", //
    targetAudience: "", //
    price: "",
    thumbnail: "",
    categories: "", //
    sections: [],
  });

  const [sections, setSections] = useState([
    {
      title: "Introduction",
      lectures: [
        {
          title: "Introduction",
          isEditing: false,
          newTitle: "Introduction",
          contents: [] as {
            type: "video";
            name: string;
            file: File | null;
            url?: string;
            duration?: number;
          }[],
        },
      ],
      showAddLecture: false,
      newLectureTitle: "",
      isEditingTitle: false,
      newTitle: "Introduction",
    },
  ]);

  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        title: `Section ${sections.length + 1}`,
        lectures: [],
        showAddLecture: false,
        newLectureTitle: "",
        isEditingTitle: false,
        newTitle: `Section ${sections.length + 1}`,
      },
    ]);
  };

  const handleDeleteSection = (idx: number) => {
    const updated = [...sections];
    updated.splice(idx, 1);
    setSections(updated);
  };

  const handleUpdateSectionTitle = (idx: number) => {
    const updated = [...sections];
    updated[idx].title = updated[idx].newTitle.trim() || updated[idx].title;
    updated[idx].isEditingTitle = false;
    setSections(updated);
  };

  const handleAddLecture = (idx: number) => {
    if (!sections[idx].newLectureTitle.trim()) return;
    const updated = [...sections];
    updated[idx].lectures.push({
      title: updated[idx].newLectureTitle.trim(),
      isEditing: false,
      newTitle: updated[idx].newLectureTitle.trim(),
      contents: [],
    });
    updated[idx].newLectureTitle = "";
    updated[idx].showAddLecture = false;
    setSections(updated);
  };

  const handleDeleteLecture = (sectionIdx: number, lectureIdx: number) => {
    const updated = [...sections];
    updated[sectionIdx].lectures.splice(lectureIdx, 1);
    setSections(updated);
  };

  const handleStartEditLecture = (sectionIdx: number, lectureIdx: number) => {
    const updated = [...sections];
    updated[sectionIdx].lectures[lectureIdx].isEditing = true;
    setSections(updated);
  };

  const handleUpdateLecture = (sectionIdx: number, lectureIdx: number) => {
    const updated = [...sections];
    const lecture = updated[sectionIdx].lectures[lectureIdx];
    lecture.title = lecture.newTitle.trim() || lecture.title;
    lecture.isEditing = false;
    setSections(updated);
  };

  const handleCancelAddLecture = (idx: number) => {
    const updated = [...sections];
    updated[idx].showAddLecture = false;
    updated[idx].newLectureTitle = "";
    setSections(updated);
  };

  const handleSelectVideoFile = (
    file: File,
    sectionIdx: number,
    lectureIdx: number
  ) => {
    const videoElement = document.createElement("video");

    videoElement.preload = "metadata";

    videoElement.onloadedmetadata = () => {
      const duration = videoElement.duration; // thời lượng tính bằng giây

      const updated = [...sections];
      updated[sectionIdx].lectures[lectureIdx].contents.push({
        type: "video",
        name: file.name,
        file,
        url: undefined,
        duration, //
      });
      setSections(updated);
    };

    videoElement.onerror = () => {
      console.error("❌ Error loading video metadata");
    };

    videoElement.src = URL.createObjectURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    const thumbnailInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    const thumbnailFile = thumbnailInput?.files?.[0];
    const userId = user?.userId;

    if (sections.length === 0) {
      setErrors((prev) => ({
        ...prev,
        sections: [
          { title: "At least one section is required.", lectures: [] },
        ],
      }));
      return;
    }

    // Validate sections + lectures
    const sectionErrors = sections.map((section) => {
      const sectionTitleError = section.title.trim()
        ? ""
        : "Section title is required.";
      const lectureErrors = section.lectures.map((lecture) => {
        if (!lecture.title.trim()) return "Lecture title is required.";
        if (lecture.contents.length === 0)
          return "At least one video is required.";
        return "";
      });
      return { title: sectionTitleError, lectures: lectureErrors };
    });

    const newErrors = {
      title: title.trim() ? "" : "Title is required.",
      subTitle: subTitle.trim() ? "" : "Subtitle is required.", //
      description: description.replace(/<\/?[^>]+(>|$)/g, "").trim()
        ? ""
        : "Description is required.",
      requirement: requirement.replace(/<\/?[^>]+(>|$)/g, "").trim()
        ? ""
        : "Requirement is required.",
      targetAudience: targetAudience.replace(/<\/?[^>]+(>|$)/g, "").trim()
        ? ""
        : "Target audience is required.", //
      price:
        /^\d+$/.test(price.trim()) && parseInt(price.trim(), 10) >= 1000
          ? ""
          : "Price must be an integer and at least 1,000 VND.",
      thumbnail:
        mode === "create" && !thumbnailFile ? "Thumbnail is required." : "",
      sections: sectionErrors,
      categories:
        categoryIds.length === 0 ? "At least one category is required." : "",
    };

    setErrors(newErrors);

    const hasErrors =
      Object.values(newErrors).some((msg) => typeof msg === "string" && msg) ||
      newErrors.sections.some(
        (sec) => sec.title || sec.lectures.some((l) => l)
      );

    if (hasErrors) return;

    const videoFiles: File[] = [];

    const formattedSections = sections.map((section, sectionIdx) => {
      let sectionId: number | undefined = undefined;

      if (mode === "edit" && courseData?.Section?.[sectionIdx]) {
        sectionId = courseData.Section[sectionIdx].sectionId;
      }

      return {
        sectionId,
        nameSection: section.title,
        order: sectionIdx + 1,
        lectures: section.lectures.map((lecture, lectureIdx) => {
          let lectureId: number | undefined = undefined;

          if (
            mode === "edit" &&
            courseData?.Section?.[sectionIdx]?.Lecture?.[lectureIdx]
          ) {
            lectureId =
              courseData.Section[sectionIdx].Lecture[lectureIdx].lectureId;
          }

          const content = lecture.contents?.[0]; // 1 video
          let video = "";
          let time = 0; //
          const isNewFile = content?.file instanceof File;

          if (isNewFile && content.file) {
            videoFiles.push(content.file);
            time = content.duration || 0; //
          } else if ("url" in content) {
            video = (content as any).url;
            time = content.duration || 0; //
          }

          return {
            lectureId,
            nameLecture: lecture.title,
            order: lectureIdx + 1,
            video,
            time, //
          };
        }),
      };
    });

    if (thumbnailFile !== undefined) {
      formData.append("thumbnail", thumbnailFile);
    }

    if (mode === "edit" && courseData?.courseId) {
      formData.append("courseId", courseData.courseId.toString());
    }
    formData.append("title", title);
    formData.append("subTitle", subTitle);
    formData.append("description", description);
    formData.append("requirement", requirement);
    formData.append("targetAudience", targetAudience); //
    formData.append("price", price);
    formData.append("userId", userId?.toString() || "");
    formData.append("isPublic", isPublic.toString());
    formData.append("categoryIds", JSON.stringify(categoryIds)); //
    formData.append("sections", JSON.stringify(formattedSections));
    videoFiles.forEach((file) => {
      formData.append("videos", file);
    });

    try {
      const res =
        mode === "edit"
          ? await courseService.updateFullCourse(courseData?.courseId, formData)
          : await courseService.createFullCourse(formData);

      if (!res.data) throw new Error("Something went wrong");
      else {
        mode === "edit"
          ? toast.success("Cập nhật khóa học thành công!")
          : toast.success("Tạo khóa học thành công!");
        setTimeout(() => {
          window.location.href = "/instructor";
        }, 2000); // Redirect after 2s
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <form className="max-w-4xl mx-auto px-6 py-10" onSubmit={handleSubmit}>
        <div className="space-y-12">
          {/* Course Info */}
          <div className="border-b border-gray-200 pb-12">
            <h2 className="text-lg font-semibold text-gray-900">
              Thông tin khóa học
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Thông tin này sẽ được hiển thị công khai, hãy cẩn trọng khi nhập.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-6 gap-6">
              <div className="col-span-full">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-900"
                >
                  Tiêu đề
                </label>
                <textarea
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  rows={2}
                  className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-600"
                  placeholder="Nhập tiêu đề khóa học..."
                />
                {errors.title && (
                  <p className="text-sm text-red-600 mt-1">{errors.title}</p>
                )}
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="subTitle"
                  className="block text-sm font-medium text-gray-900"
                >
                  Mô tả ngắn
                </label>
                <textarea
                  id="subTitle"
                  name="subTitle"
                  rows={2}
                  className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-600"
                  placeholder="Nhập mô tả ngắn..."
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                />
                {errors.subTitle && (
                  <p className="text-sm text-red-600 mt-1">{errors.subTitle}</p>
                )}
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-900"
                >
                  Mô tả chi tiết
                </label>
                <ResponsiveEditor
                  isDisplay={false}
                  value={description}
                  setValue={setDescription}
                  handleCancel={() => { }}
                  handleSave={() => { }}
                  isDisabled={false}
                  warningMessageMaxLength="Mô tả quá dài."
                  warningMessageMinLength="Vui lòng nhập mô tả."
                  saveButtonMessage=""
                  maxLength={1000}
                  hideActions={true}
                  hideWarnings={true}
                />
                {errors.description && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="requirement"
                  className="block text-sm font-medium text-gray-900"
                >
                  Yêu cầu đầu vào
                </label>
                <ResponsiveEditor
                  isDisplay={false}
                  value={requirement}
                  setValue={setRequirement}
                  handleCancel={() => { }}
                  handleSave={() => { }}
                  isDisabled={false}
                  warningMessageMaxLength="Yêu cầu quá dài."
                  warningMessageMinLength="Vui lòng nhập yêu cầu."
                  saveButtonMessage=""
                  maxLength={1000}
                  hideActions={true}
                  hideWarnings={true}
                />
                {errors.requirement && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.requirement}
                  </p>
                )}
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="targetAudience"
                  className="block text-sm font-medium text-gray-900"
                >
                  Đối tượng học
                </label>
                <ResponsiveEditor
                  isDisplay={false}
                  value={targetAudience}
                  setValue={setTargetAudience}
                  handleCancel={() => { }}
                  handleSave={() => { }}
                  isDisabled={false}
                  warningMessageMaxLength="Đối tượng học quá dài."
                  warningMessageMinLength="Vui lòng nhập đối tượng học."
                  saveButtonMessage=""
                  maxLength={1000}
                  hideActions={true}
                  hideWarnings={true}
                />
                {errors.targetAudience && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.targetAudience}
                  </p>
                )}
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-900"
                >
                  Giá (vnđ)
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  step="1"
                  min="1000"
                  className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-600"
                  placeholder="Tối thiểu 1,000 VNĐ"
                />
                {errors.price && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.price || "Vui lòng nhập giá hợp lệ (≥ 1,000 VNĐ)"}
                  </p>
                )}
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="categories"
                  className="block text-sm font-medium text-gray-900"
                >
                  Danh mục
                </label>
                <div className="mt-2 space-y-2">
                  {allCategories.map((cat) => (
                    <div key={cat.categoryId} className="flex items-center">
                      <input
                        id={`cat-${cat.categoryId}`}
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        checked={categoryIds.includes(cat.categoryId)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCategoryIds([...categoryIds, cat.categoryId]);
                          } else {
                            setCategoryIds(
                              categoryIds.filter((id) => id !== cat.categoryId)
                            );
                          }
                        }}
                      />
                      <label
                        htmlFor={`cat-${cat.categoryId}`}
                        className="ml-2 block text-sm text-gray-700"
                      >
                        {cat.categoryName}
                      </label>
                    </div>
                  ))}
                  {errors.categories && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.categories}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="isPublic"
                  className="block text-sm font-medium text-gray-900"
                >
                  Trạng thái hiển thị
                </label>
                <select
                  id="isPublic"
                  name="isPublic"
                  value={isPublic ? "true" : "false"}
                  onChange={(e) => setIsPublic(e.target.value === "true")}
                  className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-600"
                >
                  <option value="true">Công khai</option>
                  <option value="false">Riêng tư</option>
                </select>
              </div>

              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-900">
                  Ảnh bìa khóa học
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4 flex text-sm text-gray-600 justify-center items-center gap-1">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer text-indigo-600 hover:text-indigo-500 font-medium"
                      >
                        <span>Tải lên file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setThumbnailName(file.name);
                            }
                          }}
                        />
                      </label>
                      <span>hoặc kéo & thả</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      PNG, JPG, GIF tối đa 10MB
                    </p>
                    {thumbnailName && (
                      <p className="mt-1 text-sm text-gray-700 font-medium">
                        📁 {thumbnailName}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {errors.thumbnail && (
                <p className="text-sm text-red-600 mt-1">{errors.thumbnail}</p>
              )}
            </div>
          </div>

          {/* Nội dung khóa học */}
          <div className="border-b border-gray-200 pb-12">
            <h2 className="text-lg font-semibold text-gray-900">Nội Dung Chi Tiết Khóa Học</h2>
            <p className="mt-1 text-sm text-gray-600">
              Thêm các bài giảng tương ứng với từng chương/phần bên dưới.
            </p>

            <div className="mt-6 space-y-6">
              {sections.map((section, idx) => (
                <div key={idx} className="border rounded bg-gray-50 p-4">
                  {/* Tiêu đề Chương/Phần */}
                  <div className="flex justify-between items-start">
                    {section.isEditingTitle ? (
                      <div className="w-full space-y-2">
                        <input
                          type="text"
                          value={section.newTitle}
                          onChange={(e) => {
                            const updated = [...sections];
                            updated[idx].newTitle = e.target.value;
                            setSections(updated);
                          }}
                          className="w-full border border-purple-500 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {errors.sections?.[idx]?.lectures?.[idx] && (
                          <p className="text-sm text-red-600 mt-1">
                            {errors.sections[idx].lectures[idx]}
                          </p>
                        )}

                        <div className="flex justify-between text-sm">
                          <button
                            type="button"
                            className="text-gray-700 hover:underline"
                            onClick={() => {
                              const updated = [...sections];
                              updated[idx].isEditingTitle = false;
                              updated[idx].newTitle = updated[idx].title;
                              setSections(updated);
                            }}
                          >
                            Hủy
                          </button>
                          <button
                            type="button"
                            className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-500"
                            onClick={() => handleUpdateSectionTitle(idx)}
                          >
                            Cập Nhật Chương
                          </button>
                        </div>
                      </div>
                    ) : (
                      <h3 className="font-semibold text-gray-800 text-base flex-1">
                        Chương {idx + 1}: {section.title}
                      </h3>
                    )}
                    {!section.isEditingTitle && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const updated = [...sections];
                            updated[idx].isEditingTitle = true;
                            setSections(updated);
                          }}
                        >
                          <PencilIcon className="h-4 w-4 text-gray-500" />
                        </button>
                        <button onClick={() => handleDeleteSection(idx)}>
                          <TrashIcon className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
                    )}
                    {errors.sections?.[idx]?.title && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.sections[idx].title}
                      </p>
                    )}
                  </div>

                  {/* Bài giảng */}
                  {section.lectures.map((lecture, ldx) => (
                    <div
                      key={ldx}
                      className="flex flex-col bg-white border rounded px-4 py-2 mt-3 gap-2"
                    >
                      {lecture.isEditing ? (
                        <>
                          <input
                            type="text"
                            value={lecture.newTitle}
                            onChange={(e) => {
                              const updated = [...sections];
                              updated[idx].lectures[ldx].newTitle = e.target.value;
                              setSections(updated);
                            }}
                            className="w-full border border-purple-500 rounded px-3 py-2 text-sm"
                          />
                          {errors.sections?.[idx]?.lectures?.[ldx] && (
                            <p className="text-sm text-red-600 mt-1">
                              {errors.sections[idx].lectures[ldx]}
                            </p>
                          )}
                          <div className="flex justify-between text-sm">
                            <button
                              onClick={() => {
                                const updated = [...sections];
                                updated[idx].lectures[ldx].isEditing = false;
                                updated[idx].lectures[ldx].newTitle =
                                  updated[idx].lectures[ldx].title;
                                setSections(updated);
                              }}
                              className="text-gray-700 hover:underline"
                            >
                              Hủy
                            </button>
                            <button
                              onClick={() => handleUpdateLecture(idx, ldx)}
                              className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-500"
                            >
                              Cập Nhật
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2 text-sm text-gray-800">
                            <DocumentTextIcon className="h-4 w-4 text-gray-500" />
                            <span>
                              Bài giảng {ldx + 1}: {lecture.title}
                            </span>
                            <PencilIcon
                              className="h-4 w-4 cursor-pointer text-gray-500 hover:text-blue-500"
                              onClick={() => handleStartEditLecture(idx, ldx)}
                            />
                            <TrashIcon
                              className="h-4 w-4 cursor-pointer text-gray-500 hover:text-red-500"
                              onClick={() => handleDeleteLecture(idx, ldx)}
                            />
                          </div>

                          {/* Thêm video bài giảng */}
                          {lecture.contents.length === 0 ? (
                            <div className="relative">
                              <input
                                type="file"
                                accept="video/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleSelectVideoFile(file, idx, ldx);
                                    e.target.value = "";
                                  }
                                }}
                              />
                              <button
                                type="button"
                                className="border border-purple-600 text-purple-600 text-sm px-3 py-1 rounded hover:bg-purple-50 font-medium"
                              >
                                + Thêm Video
                              </button>
                            </div>
                          ) : (
                            <p className="text-xs text-gray-500">
                              🎬 Video đã được thêm
                            </p>
                          )}
                        </div>
                      )}

                      {/* Danh sách file đã chọn */}
                      {lecture.contents.length > 0 && (
                        <ul className="pl-6 space-y-1 text-sm text-gray-700">
                          {lecture.contents.map((c, i) => (
                            <li key={i}>
                              🎬 {c.name}{" "}
                              {c.url && (
                                <span className="text-gray-400">(đã tải lên)</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}

                      {errors.sections?.[idx]?.lectures?.[ldx] && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.sections[idx].lectures[ldx]}
                        </p>
                      )}
                    </div>
                  ))}

                  {/* Form thêm bài giảng */}
                  {section.showAddLecture && (
                    <div className="border mt-3 rounded p-4 bg-white">
                      <label className="block text-sm font-medium text-gray-900 mb-1">
                        Bài Giảng Mới:
                      </label>
                      <input
                        type="text"
                        className="w-full border border-purple-500 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Nhập tiêu đề bài giảng"
                        value={section.newLectureTitle}
                        onChange={(e) => {
                          const updated = [...sections];
                          updated[idx].newLectureTitle = e.target.value;
                          setSections(updated);
                        }}
                        maxLength={80}
                      />
                      <div className="mt-2 flex justify-between items-center text-sm">
                        <span className="text-gray-500">
                          {80 - section.newLectureTitle.length} ký tự còn lại
                        </span>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleCancelAddLecture(idx)}
                            className="text-gray-700 hover:underline"
                          >
                            Hủy
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAddLecture(idx)}
                            className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-500"
                          >
                            Thêm Bài Giảng
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Thông báo lỗi nếu chưa có bài giảng */}
                  {section.lectures.length === 0 && (
                    <p className="text-sm text-red-600 mt-2">
                      Mỗi chương cần ít nhất 1 bài giảng.
                    </p>
                  )}

                  <button
                    onClick={() => {
                      const updated = [...sections];
                      updated[idx].showAddLecture = true;
                      setSections(updated);
                    }}
                    type="button"
                    className="mt-3 text-sm text-purple-700 border border-purple-700 hover:bg-purple-50 px-3 py-1 rounded"
                  >
                    + Thêm Bài Giảng
                  </button>
                </div>
              ))}
              {sections.length === 0 && (
                <p className="text-sm text-red-600 mt-1">
                  Cần tạo ít nhất một chương.
                </p>
              )}
              <button
                onClick={handleAddSection}
                type="button"
                className="text-sm text-purple-700 border border-purple-700 hover:bg-purple-50 px-4 py-2 rounded"
              >
                + Thêm Chương
              </button>
            </div>
          </div>


          {/* Footer */}
          <div className="mt-8 flex justify-end gap-x-4">
            <button
              type="button"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Lưu khóa học
            </button>
          </div>
        </div>
      </form>
    </>
  );

}

export default withRole(CourseForm, ["INSTRUCTOR"]);
