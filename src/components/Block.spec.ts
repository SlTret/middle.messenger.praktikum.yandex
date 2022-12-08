import { expect } from "chai";
import { Button } from "./button/button";

describe('Проверяем Компонент', () => {
  const text1 = "Кнопка";
  const button = new Button({text:text1});

  it('Проверяем установку Props', () => {
    expect(button.props.text).to.eq(text1);
  }),

  it('Проверяем обновление Props', () => {
    const text2 = "Кнопка изменилась";
    button.setProps({text:text2})
    expect(button.props.text).to.eq(text2);
  });
});
