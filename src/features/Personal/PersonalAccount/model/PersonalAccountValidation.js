import {
  notify,
  phoneNumberRefactorer,
  usersRequester,
  validateForm,
} from "@/shared";
import { useEffect, useRef, useState } from "react";

export const usePersonalAccount = () => {
  // состояние для фокуса label
  const [focusedInput, setFocusedInput] = useState("");

  // данные для выпадающего списка
  const optionsItems = ["Мужской", "Женский"];

  // состояние для подтверждения об выходе с акунта
  const [confirmationExit, setConfirmationExit] = useState(false);

  // состояние для редактирования
  const [editMode, setEditMode] = useState(true);

  // состояние для дроп меню опции
  const [dropDownMenu, setDropDownMenu] = useState(true);

  // состояние для доступа к кнопке
  const [isDisabled, setIsDisabled] = useState(false);

  // ------
  const selectRef = useRef(null);

  // данные для предстоящих приёмом
  const receptionsList = [
    {
      direction: "УЗИ беременности",
      doctor: "Кадырбекова Уулжан Ахментовна",
      date: "26.02.2024",
      time: "13:30",
      id: 1,
    },
    {
      direction: "МРТ головного мозга",
      doctor: "Садырбаев Замир Кенешович",
      date: "27.02.2024",
      time: "12:15",
      id: 2,
    },
  ];

  // обьект с данными для валидации полей
  const validationRules = {
    name: {
      errorMessage: ["Заполните поле Имя", "Имя от 2 до 20 символов!"],
      maxLength: 20,
      minLength: 2,
    },
    lastName: {
      errorMessage: ["Заполните поле Фамилия", "Фамилия от 2 до 20 символов!"],
      maxLength: 20,
      minLength: 2,
    },
    phone: {
      errorMessage: ["Заполните поле Номер", "Не корректный номер!"],
      minLength: 16,
    },
    date: {
      errorMessage: ["Заполните поле дата"],
      minLength: 0,
    },
    password: {
      minLength: 6,
      maxLength: 24,
      errorMessage: [
        "Заполните поле пароля",
        "не менее 6 до 24 символов",
        "Пароли не совпадают",
        // "Пароль должен содержать от 6 до 14 символов, как минимум одну цифру, одну букву верхнего и нижнего регистра, а также один специальный символ (!@#$%^&*)",
      ],
    },
  };

  // состояние для запроса данных клиента
  const [userProfil, setUserProfil] = useState([]);

  // сама функция для запроса
  const DataProfil = async () => {
    const response = await usersRequester("/profile/");
    if (response && response.status === 200) {
      setUserProfil(response.data);
    }
  };

  useEffect(() => {
    DataProfil();
  }, []);

  // состояния для полей
  const [inputValues, setInputValues] = useState({
    name: "",
    lastName: "",
    phone: "",
    date: "",
    gender: "",
  });

  // диструктуризирую данные с состояния в котором хрянятся данные пользователя
  const { first_name, last_name, phone_number, birth_date, gender } =
    userProfil;

  // Перевожу с английского на русский
  const genderEnRu = gender === "Man" ? "Мужской" : "Женский";

  useEffect(() => {
    // Обновляем inputValues после получения данных профиля
    setInputValues((prevValues) => ({
      ...prevValues,
      name: first_name,
      lastName: last_name,
      phone: phone_number,
      date: birth_date,
      gender: genderEnRu,
    }));
  }, [userProfil]);

  // состояние для выводов ошибок полей
  const [errorsInput, setErrorsInput] = useState({
    name: "",
    lastName: "",
    phone: "",
    date: "",
    gender: "",
  });

  // функция для обработки инпутов (полей)
  const handleInputChange = (event, inputName) => {
    const { value } = event.target;
    setInputValues({ ...inputValues, [inputName]: value });

    // вызываем функцию для валидации
    validateInput(inputName, value);
  };

  // сама функция для валидации
  const validateInput = (inputName, value) => {
    const { errorMessage, maxLength, minLength } = validationRules[inputName];

    const error = validateForm(value, maxLength, minLength, errorMessage);

    setErrorsInput({ ...errorsInput, [inputName]: error });
  };

  //функция для хранения состояния с выбраного варианта
  const handleOptionClick = (option) => {
    setInputValues({ ...inputValues, gender: option });
  };

  // для выключения выпадающего списка опций, если пользователь нажал не на тот область
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setDropDownMenu(true);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // функция редактирование, для вкл выпадающего списка опций и для активаций елементов для редактирования
  const handleEdit = () => {
    setEditMode(false);
    setDropDownMenu(true);
    // setInputValues({ ...inputValues, password: "" });
  };

  // функция для включения режима редактирования и так же выкл опцию
  const infoCabinetSettingsClose = () => {
    setEditMode(true);
    setDropDownMenu(true);
  };

  useEffect(() => {
    // Проверка, должна ли кнопка стать неактивной
    setIsDisabled(
      Object.values(errorsInput).some((error) => error !== "") || // Проверка на наличие ошибок валидации
        Object.values(inputValues).some((value) => value.trim() === ""), // Проверка на пустые поля ввода
    );
  }, [errorsInput]);

  // функция отправки формы
  const handleSubmit = async (event) => {
    event.preventDefault();

    // диструктуризация значений с полей
    const { name, lastName, date, gender, phone } = inputValues;

    // функция для того чтобы убрать тере и скобки
    const phoneNum = phoneNumberRefactorer(phone);

    // Перевожу с русский на английский
    const genderRuEn = gender === "Мужской" ? "Man" : "Women";

    const response = await usersRequester(
      "/profile/",
      {
        phone_number: phoneNum,
        first_name: name,
        last_name: lastName,
        birth_date: date,
        gender: genderRuEn,
      },
      "patch",
    );

    if (response && response.status === 200) {
      notify.success("Данные успешно изменены!");
      setEditMode(true);
    }
  };

  return {
    infoCabinetSettingsClose,
    setConfirmationExit,
    handleOptionClick,
    handleInputChange,
    confirmationExit,
    setFocusedInput,
    receptionsList,
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
  };
};
