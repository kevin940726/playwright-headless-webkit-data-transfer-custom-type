import { test, expect } from '@playwright/test';

test('dragging-and-dropping dataTransfer with custom types', async ({
  page,
}) => {
  await page.setContent(`
		<button draggable="true">Draggable</button>
	`);

  const resultPromise = page.evaluate(
    () =>
      new Promise((resolve) => {
        document.addEventListener(
          'dragstart',
          (event) => {
            event.dataTransfer!.setData('custom-type', 'Hello World');
          },
          false
        );

        document.addEventListener(
          'dragenter',
          (event) => {
            event.preventDefault();
          },
          false
        );
        document.addEventListener(
          'dragover',
          (event) => {
            event.preventDefault();
          },
          false
        );

        document.addEventListener(
          'drop',
          (event) => {
            event.preventDefault();
            resolve({
              types: event.dataTransfer!.types,
              data: event.dataTransfer!.getData('custom-type'),
            });
          },
          false
        );
      })
  );

  await page.hover('[draggable="true"]');
  await page.mouse.down();
  await page.mouse.move(100, 100);
  await page.mouse.up();

  await expect(resultPromise).resolves.toEqual({
    types: ['custom-type'],
    data: 'Hello World',
  });
});
