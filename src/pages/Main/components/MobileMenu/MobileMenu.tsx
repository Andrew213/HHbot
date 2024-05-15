import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import {useUnit} from "effector-react";
import {useMemo, useState} from "react";

import {$resumes} from "../SelectResume/model";

interface MobileMenuI {
  resume_id: string;
  message: string;
  setMessage: (a: string) => void;
}

const MobileMenu: React.FC<MobileMenuI> = ({
  resume_id,
  message,
  setMessage,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();

  const [resumeList] = useUnit([$resumes]);

  const handleOnMenuClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const currentResume = useMemo(
    () => resumeList?.find(el => el.id === resume_id),
    [resume_id, resumeList],
  );

  return (
    <Box ml={-1.2}>
      <IconButton
        onClick={handleOnMenuClick}
        aria-label="menu"
        id="long-button"
        aria-haspopup="true"
        size="large">
        <MenuIcon fontSize="inherit" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleCloseMenu}
        id="long-button">
        <MenuItem>
          <Button href={currentResume?.alternate_url || ""} target="_blank">
            {currentResume?.title}
          </Button>
        </MenuItem>
        <MenuItem>
          <TextField
            size="medium"
            fullWidth
            value={message}
            onKeyDown={e => {
              e.stopPropagation();
            }}
            onChange={e => setMessage(e.currentTarget.value)}
            label="Сопроводительное"
            multiline
            placeholder="Просто ввести"
          />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default MobileMenu;
