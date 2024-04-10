import { PostHistoryData } from "../model/PostHistoryData";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Typography } from "@/shared";

import style from "./PostHistory.module.scss";
import { PostHistoryComponent } from "./ui/PostHistoryComponent";

export const PostHistory = () => {
  const { postsHistoryList } = PostHistoryData();
  const navigate = useNavigate();

  return (
    <div className={style.postHistoryForm}>
      <div className={style.postHistoryFormHead}>
        <ChevronLeft
          width={20}
          onClick={() => navigate(-1)}
          className={style.postHistoryBack}
        />
        <Typography
          variant="h2"
          weight="600"
          className={style.postHistoryTitle}
        >
          История записей
        </Typography>
      </div>
      <div className={style.postHistoryFormWrapper}>
        {postsHistoryList.map((postHistory, index) => (
          <PostHistoryComponent key={index} {...postHistory} />
        ))}
      </div>
    </div>
  );
};
