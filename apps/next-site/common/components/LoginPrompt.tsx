import { openLoginPopup } from "../hooks/useLogin"

export default () => (
  <div>
    <p>no logined</p>
    <button
      onClick={() => {
        openLoginPopup()
      }}
    >
      click to login
    </button>
  </div>
)
