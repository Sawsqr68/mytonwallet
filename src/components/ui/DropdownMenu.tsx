import React, { memo } from '../../lib/teact/teact';

import type { DropdownItem } from './Dropdown';

import buildClassName from '../../util/buildClassName';

import useLang from '../../hooks/useLang';

import Menu from './Menu';

import styles from './Dropdown.module.scss';

interface OwnProps {
  isOpen: boolean;
  selectedValue?: string;
  items: DropdownItem[];
  menuPosition?: 'top' | 'bottom';
  menuPositionHorizontal?: 'right' | 'left';
  shouldTranslateOptions?: boolean;
  className?: string;
  bubbleClassName?: string;
  buttonClassName?: string;
  onSelect?: (value: string) => void;
  onClose: NoneToVoidFunction;
}

function DropdownMenu({
  isOpen,
  selectedValue,
  items,
  menuPosition,
  menuPositionHorizontal,
  shouldTranslateOptions,
  className,
  bubbleClassName,
  buttonClassName,
  onSelect,
  onClose,
}: OwnProps) {
  const lang = useLang();

  const handleItemClick = (e: React.MouseEvent, value: string) => {
    e.stopPropagation();
    onSelect?.(value);
    onClose();
  };

  return (
    <Menu
      isOpen={isOpen}
      positionX={menuPositionHorizontal}
      positionY={menuPosition}
      type="dropdown"
      className={className}
      bubbleClassName={bubbleClassName}
      onClose={onClose}
    >
      {items.map((item) => {
        const fullButtonClassName = buildClassName(
          styles.item,
          item.icon && styles.item_with_icon,
          item.isDisabled && styles.disabled,
          item.isDangerous && styles.dangerous,
          item.withSeparator && styles.separator,
          selectedValue === item.value && styles.item_selected,
          buttonClassName,
        );
        return (
          <button
            key={item.value}
            type="button"
            className={fullButtonClassName}
            disabled={item.isDisabled}
            onClick={(e) => handleItemClick(e, item.value)}
          >
            {item.icon && <img src={item.icon} alt="" className={buildClassName('icon', styles.itemIcon)} />}
            {item.fontIcon && (
              <i className={buildClassName(`icon icon-${item.fontIcon}`, styles.fontIcon)} aria-hidden />
            )}
            <span className={buildClassName(styles.itemName, 'menuItemName')}>
              {shouldTranslateOptions ? lang(item.name) : item.name}
              {item.description && (
                <span className={styles.itemDescription}>
                  {shouldTranslateOptions ? lang(item.description) : item.description}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </Menu>
  );
}

export default memo(DropdownMenu);
