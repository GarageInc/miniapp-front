import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router";

import { BackArrowIcon } from "@/shared/ui/icons";

type BackButtonProps = {
  to: string;
};

export const BackButton = ({ to }: BackButtonProps) => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <>
      <div className={classes.backBtn} onClick={() => navigate(to)}>
        <BackArrowIcon />
        <span className={classes.backBtnText}>Back</span>
      </div>
    </>
  );
};

const useStyles = createUseStyles({
  backBtn: {
    display: "flex",
    cursor: "pointer",
    marginTop: "24px",
    borderRadius: "10px",
    padding: "10px 16px 10px 10px",
    alignItems: "center",
    backgroundColor: "#B8B8B833",
    alignSelf: "start",
  },
  backBtnText: {
    fontFamily: "SemiBold",
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "24px",
    color: "#FFFFFF",
    marginLeft: "4px",
  },
});
