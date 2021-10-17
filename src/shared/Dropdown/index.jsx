import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Card from '@mui/material/Card';

const CustomDropdown = ({ content, el, onClose }) => {
    return (
            <ClickAwayListener onClickAway={onClose}>
                <Popper open={Boolean(el)} anchorE={el}>
                    <Card elevation={3}>
                        <h1>tEST</h1>
                        {content}
                    </Card>
                </Popper>
            </ClickAwayListener>
    )
}
export default CustomDropdown;