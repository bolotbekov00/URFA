import { CustomButton, CustomInput, Typography } from "@/shared";
import { useFormValidation } from "../model/useFormValidation";

import style from "./PersonalReset.module.scss";
import { useEffect, useState } from "react";

export const PersonalReset = () => {
  const {
    // диструктуризация
    setFocusedInput,
    handleInputChange,
    inputValues,
    focusedInput,
    errorsInput,
    passwordMatch,
  } = useFormValidation();

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled(
      Object.values(errorsInput).some((error) => error !== "") || // Проверка на наличие ошибок валидации
        Object.values(inputValues).some((value) => value.trim() === "") || // Проверка на пустые поля ввода
        !passwordMatch,
    );
  }, [inputValues, errorsInput]);

  return (
    <form className={style.personalReset}>
      <div className={style.personalResetHead}>
        <Typography variant="h2" className={style.personalResetTitle}>
          Смена пароля
        </Typography>
        <Typography variant="body" className={style.personalResetBody}>
          Пароль должен состоять из восьми или более символов латинского
          алфавита, содержать заглавные и строчные буквы, цифры
        </Typography>
      </div>
      <div>
        {errorsInput.oldPassword ? (
          <label className={style.errorLabel}>{errorsInput.oldPassword}</label>
        ) : (
          <label
            htmlFor="oldPassword"
            className={focusedInput === "oldPassword" ? style.focusedLabel : ""}
          >
            Старый пароль
          </label>
        )}
        <CustomInput
          id="oldPassword"
          type="password"
          onBlur={() => setFocusedInput("")}
          onFocus={() => setFocusedInput("oldPassword")}
          value={inputValues.oldPassword}
          placeholder="Введите старый пароль"
          onChange={(event) => handleInputChange(event, "oldPassword")}
        />
      </div>
      <div>
        {errorsInput.password ? (
          <label className={style.errorLabel}>{errorsInput.password}</label>
        ) : (
          <label
            htmlFor="password"
            className={focusedInput === "password" ? style.focusedLabel : ""}
          >
            Пароль
          </label>
        )}
        <CustomInput
          id="password"
          type="password"
          onBlur={() => setFocusedInput("")}
          onFocus={() => setFocusedInput("password")}
          value={inputValues.password}
          placeholder="Введите старый пароль"
          onChange={(event) => handleInputChange(event, "password")}
        />
      </div>
      <div>
        {errorsInput.enterPassword ? (
          <label className={style.errorLabel}>
            {errorsInput.enterPassword}
          </label>
        ) : !passwordMatch && inputValues.enterPassword ? (
          <label className={style.errorLabel}>Пароли не совпадают</label>
        ) : (
          <label
            htmlFor="enterPassword"
            className={
              focusedInput === "enterPassword" ? style.focusedLabel : ""
            }
          >
            Подтвердите новый пароль
          </label>
        )}
        <CustomInput
          id="enterPassword"
          type="password"
          onBlur={() => setFocusedInput("")}
          onFocus={() => setFocusedInput("enterPassword")}
          value={inputValues.enterPassword}
          placeholder="Введите старый пароль"
          onChange={(event) => handleInputChange(event, "enterPassword")}
        />
      </div>
      <CustomButton
        variant="default"
        type="submit"
        disabled={isDisabled}
        className={style.personalResetButton}
      >
        Подтвердить
      </CustomButton>
    </form>
  );
};
