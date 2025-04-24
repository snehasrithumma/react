import React, { useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Tabs.css'

function getTabListItemId(tabsId, value) {
  return tabsId + '-tab-' + value;
}

function getTabPanelId(tabsId, value) {
  return tabsId + '-tabpanel-' + value;
}

export default function Tabs({ defaultValue, items }) {
  const tabsId = useId();
  const navigate = useNavigate();
  const [value, setValue] = useState(
    defaultValue ?? items[0].label,
  );

  return (
    <div className="tabs">
      <div className="tabs-list" role="tablist">
        {items.map(({ label: itemValue, url }) => {
          const isActiveValue = itemValue === value;

          return (
            <button
              id={getTabListItemId(tabsId, itemValue)}
              key={itemValue}
              type="button"
              className={[
                'tabs-list-item',
                isActiveValue && 'tabs-list-item--active',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => {navigate(url);
                setValue(itemValue);
              }}
              role="tab"
              aria-controls={getTabPanelId(
                tabsId,
                itemValue,
              )}
              aria-selected={isActiveValue}>
              {itemValue}
            </button>
          );
        })}
      </div>
    </div>
  );
}
