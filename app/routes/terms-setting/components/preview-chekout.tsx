import { hsbaToHexWithAlpha } from '~/modules/utils/color-utils';
import MarkDown from '~/components/mark-down';

const PreviewCheckout = ({ formState }) => {
  return (
    <div
      style={{
        justifyContent: formState.staged.textAlign?.toLowerCase(),
        alignItems: 'center',
        display: 'flex',
      }}
    >
      <div className="w-4/5 ">
        <div
          className="flex items-center"
          style={{
            justifyContent: formState.staged.textAlign?.toLowerCase(),
            color: hsbaToHexWithAlpha(formState.staged.textColor),
            textAlign: formState.staged.textAlign?.toLowerCase(),
            fontSize: formState.staged.textFontSize + 'px',
            lineHeight: 'normal',
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            id="wenexus_checkbox2"
            onChange={(e) =>
              formState.addChange({
                checked: e.target.checked,
              })
            }
            checked={formState.staged.checked}
            style={{
              height: formState.staged.textFontSize + 'px',
              width: formState.staged.textFontSize + 'px',
            }}
          />
          <label htmlFor="wenexus_checkbox2" style={{ marginLeft: '5px' }}>
            <MarkDown
              input={formState.staged.text}
              style={{
                color: hsbaToHexWithAlpha(formState.staged.textLinkColor),
                textDecoration: !formState.staged.textLinkUnderline
                  ? 'none'
                  : 'underline',
              }}
            />
          </label>
        </div>

        {!formState.staged.checked ? (
          <>
            <div
              className="wenexus_warning mb-8 mt-[-25px] flex items-center"
              style={{
                color: hsbaToHexWithAlpha(formState.staged.warningTextColor),
                fontSize: formState.staged.warningTextFontSize + 'px',
                lineHeight: 'normal',
                // textAlign: formState.staged.textAlign.toLowerCase(),
              }}
            >
              <span className="mr-1">⚠️</span>
              <span>
                <MarkDown
                  input={formState.staged.warningText}
                  style={{
                    color: hsbaToHexWithAlpha(formState.staged.textLinkColor),
                    textDecoration: !formState.staged.textLinkUnderline
                      ? 'none'
                      : 'underline',
                  }}
                />
              </span>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default PreviewCheckout;
