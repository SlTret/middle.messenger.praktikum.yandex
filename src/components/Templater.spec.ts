import { expect } from "chai";
import tpl from "./button/button.hbs";

describe('Проверяем Шаблонизатор', () => {
    it('Передача параметров в импортируемый шаблон', () => {
      const text = "Кнопка";
      expect(tpl({text}).trim()).to.eq(text);
    });
})

