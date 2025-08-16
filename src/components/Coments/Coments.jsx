import React from "react";
import style from "./Coments.module.css";
import UpdateComment from "./../UpdateComment/UpdateComment";
import DeleteComment from "./../DeleteComment/DeleteComment";

export default function Coments({ comment }) {
  let { commentCreator, content, createdAt, _id } = comment;

  return (
    <>
      <div className="mt-2 bg-slate-400 border-2 border-slate-950 rounded-2xl p-2">
        <div className="flex justify-between items-center">
          <div>
            <div>
              <div className="flex items-center">
                {commentCreator?.photo && (
                  <img src={commentCreator?.photo} alt="" />
                )}
              </div>
              <p>{commentCreator?.name}</p>
            </div>
            <div>
              <p>{content}</p>
            </div>
          </div>
          <div>
            <p className="text-slate-500">{createdAt}</p>
          </div>
        </div>
        <div className="w-fit ms-auto flex gap-2.5">
          <DeleteComment commentId={_id} />
          <UpdateComment commentId={_id} />
        </div>
      </div>
    </>
  );
}
