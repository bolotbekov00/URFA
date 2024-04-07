import {
  CustomButton,
  CustomInput,
  Dagger,
  ModalWrapper,
  MoreVertical,
  SelectComponent,
  Typography,
} from "@/shared";
import { IMaskInput } from "react-imask";
import { Link } from "react-router-dom";

import style from "./PersonalAccount.module.scss";
import { ModalPersonal, UpcomingReceptionComponent } from "../components";
import { usePersonalAccount } from "../model/PersonalAccountValidation";

export const PersonalAccount = () => {
  const {
    // диструктурирую состоянии и функции с хука usePersonalAccount
    infoCabinetSettingsClose,
    handleDeleteConfirmation,
    handleConfirmDelete,
    setConfirmationExit,
    handleOptionClick,
    handleInputChange,
    setConfirmationId,
    confirmationExit,
    setFocusedInput,
    receptionsList,
    confirmationId,
    optionsItems,
    dropDownMenu,
    handleSubmit,
    focusedInput,
    errorsInput,
    inputValues,
    handleEdit,
    selectRef,
    editMode,
    isDisabled,
    setDropDownMenu,
  } = usePersonalAccount();

  return (
    <div className={style.personalAccount}>
      <form onSubmit={handleSubmit} className={style.personalForm}>
        <div className={style.personalAccountHeading}>
          <Typography
            weight="600"
            variant="h2"
            className={style.personalCabinetTitle}
          >
            Личный кабинет
          </Typography>
          {editMode === true ? (
            <MoreVertical
              forwardedRef={selectRef}
              className={style.personalAccountIconOpen}
              onClick={() => setDropDownMenu(!dropDownMenu)}
            />
          ) : (
            <Dagger
              className={style.personalAccountIconClose}
              onClick={infoCabinetSettingsClose}
            />
          )}
          {dropDownMenu === false && (
            <div className={style.dropDownMenu}>
              <button
                type="button"
                onClick={handleEdit}
                className={style.dropDownMenuEdit}
              >
                Редактировать
              </button>
              <Link to={"analyses-history"}>История анализов</Link>
              <Link to={"post-history"}>История записей</Link>
              <button
                type="button"
                onClick={() => setConfirmationExit(true)}
                className={style.dropDownMenuEdit}
              >
                Выйти из кабинета
              </button>
            </div>
          )}
        </div>
        <div className={style.formWrapper}>
          <div>
            {errorsInput.name ? (
              <label htmlFor="name" className={style.errorLabel}>
                {errorsInput.name}
              </label>
            ) : (
              <label
                htmlFor="name"
                className={focusedInput === "name" ? style.focusedLabel : ""}
              >
                Имя
              </label>
            )}
            <CustomInput
              id="name"
              type="text"
              value={inputValues.name || ""}
              onBlur={() => setFocusedInput("")}
              onFocus={() => setFocusedInput("name")}
              onChange={(event) => handleInputChange(event, "name")}
              className={editMode ? "" : style.personalCabinetInput}
              disabledInput={editMode}
            />
          </div>
          <div>
            {errorsInput.lastName ? (
              <label htmlFor="lastName" className={style.errorLabel}>
                {errorsInput.lastName}
              </label>
            ) : (
              <label
                htmlFor="lastName"
                className={
                  focusedInput === "lastName" ? style.focusedLabel : ""
                }
              >
                Фамилия
              </label>
            )}
            <CustomInput
              id="lastName"
              type="text"
              onBlur={() => setFocusedInput("")}
              value={inputValues.lastName || ""}
              onFocus={() => setFocusedInput("lastName")}
              onChange={(event) => handleInputChange(event, "lastName")}
              className={editMode ? "" : style.personalCabinetInput}
              disabledInput={editMode}
            />
          </div>
          <div>
            {errorsInput.phone ? (
              <label htmlFor="phone" className={style.errorLabel}>
                {errorsInput.phone}
              </label>
            ) : (
              <label
                htmlFor="phone"
                className={focusedInput === "phone" ? style.focusedLabel : ""}
              >
                Номер
              </label>
            )}
            <IMaskInput
              lazy={true}
              id="phone"
              type="phone"
              mask="+{996}(000)000-000"
              placeholder="+996 (999) 999-999"
              value={inputValues.phone || ""}
              onInput={(event) => handleInputChange(event, "phone")}
              disabled={editMode}
              onFocus={() => setFocusedInput("phone")}
              onBlur={() => setFocusedInput("")}
              className={
                editMode
                  ? style.cabinetInputPhone
                  : style.cabinetInputPhoneActive
              }
            />
          </div>
          <div>
            {errorsInput.date ? (
              <label htmlFor="date" className={style.errorLabel}>
                {errorsInput.date}
              </label>
            ) : (
              <label
                htmlFor="date"
                className={focusedInput === "date" ? style.focusedLabel : ""}
              >
                Дата рождения
              </label>
            )}
            {editMode ? (
              <input
                id="date"
                type="date"
                value={inputValues.date || ""}
                className={style.fakeInput}
                disabled
              />
            ) : (
              <CustomInput
                id="date"
                type="date"
                value={inputValues.date || ""}
                onBlur={() => setFocusedInput("")}
                onFocus={() => setFocusedInput("date")}
                onChange={(event) => handleInputChange(event, "date")}
                className={editMode ? "" : style.personalCabinetInput}
              />
            )}
          </div>
          <div>
            {errorsInput.password ? (
              <label htmlFor="password" className={style.errorLabel}>
                {errorsInput.password}
              </label>
            ) : (
              <label
                htmlFor="password"
                className={
                  focusedInput === "password" ? style.focusedLabel : ""
                }
              >
                Пароль
              </label>
            )}
            {editMode ? (
              <input
                id="password"
                value={
                  inputValues.password
                    .split("")
                    .map(() => "•")
                    .join("") || ""
                }
                className={style.fakeInput}
                disabled
              />
            ) : (
              <CustomInput
                id="password"
                type="password"
                onBlur={() => setFocusedInput("")}
                onFocus={() => setFocusedInput("password")}
                value={inputValues.password || ""}
                onChange={(event) => handleInputChange(event, "password")}
                className={editMode ? "" : style.personalCabinetInput}
                disabledInput={editMode}
              />
            )}
          </div>
          <div>
            <label htmlFor="gender" className={style.personalCabinetLabel}>
              Пол
            </label>
            {editMode ? (
              <input
                id="gender"
                value={inputValues.gender || ""}
                className={style.fakeInput}
                disabled
              />
            ) : (
              <SelectComponent
                selectTitle={
                  inputValues.gender ? inputValues.gender : "Укажите свой пол"
                }
                onClickOption={handleOptionClick}
                optionsItems={optionsItems}
              />
            )}
          </div>
        </div>
        {editMode === false && (
          <CustomButton
            color="default"
            disabled={isDisabled}
            className={style.personalAccountButton}
          >
            Сохранить
          </CustomButton>
        )}
      </form>
      <div className={style.upcomingReceptions}>
        <Typography
          className={style.upcomingReceptionsTitle}
          variant="h3"
          weight="600"
        >
          Предстоящие приёмы
        </Typography>
        {confirmationExit && (
          <ModalWrapper onCloseModal={() => setConfirmationExit(false)}>
            <ModalPersonal
              title="Вы действительно хотите выйти из кабинета?"
              confirmation="exit"
              setConfirmationExit={setConfirmationExit}
            />
          </ModalWrapper>
        )}
        {confirmationId && (
          <ModalWrapper onCloseModal={() => setConfirmationId(false)}>
            <ModalPersonal
              title="Вы действительно хотите отменить запись?"
              confirmation="id"
              setConfirmationId={setConfirmationId}
              handleConfirmDelete={handleConfirmDelete}
            />
          </ModalWrapper>
        )}
        <div className={style.upcomingReceptionsWrapper}>
          {receptionsList.map((reception) => (
            <UpcomingReceptionComponent
              key={reception.id}
              reception={reception}
              editMode={editMode}
              onDelete={handleDeleteConfirmation} // Передаем функцию обработки удаления
            />
          ))}
        </div>
      </div>
    </div>
  );
};
