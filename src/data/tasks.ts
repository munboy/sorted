export interface Task {
  slug: string;
  title: string;
  section: 'arrays' | 'sort' | 'algorithms' | 'production';
  sectionTitle: string;
  difficulty: 'Легкий' | 'Средний' | 'Сложный';
  statement: string;
  expectedInputOutput: string;
  constraints?: string;
  hints: string[];
  commonMistakes: string[];
  filePath: string;          // e.g., "tasks/arrays/basic-iteration/solution.ts"
  testCommand: string;       // e.g., "npx vitest tasks/arrays/basic-iteration/solution.test.ts"
}

export const tasks: Task[] = [
  {
    slug: 'arrays-basic-iteration',
    title: 'Базовый обход и поиск максимального',
    section: 'arrays',
    sectionTitle: 'Массивы и методы',
    difficulty: 'Легкий',
    statement: 'Напишите функцию findMax(arr), которая принимает массив чисел и возвращает наибольшее число. Если массив пустой, функция должна возвращать значение undefined.',
    expectedInputOutput: 'Вход: [4, 9, 2, 7, 5] => Выход: 9\nВход: [-10, -5, -30] => Выход: -5\nВход: [] => Выход: undefined',
    constraints: 'Массив может содержать целые числа, дробные числа, а также отрицательные значения. Не используйте встроенный метод Math.max().',
    hints: [
      'Инициализируйте переменную-максимум значением первого элемента массива.',
      'Используйте стандартный цикл for или for...of для обхода элементов начиная с индекса 1.',
      'Перед началом обхода проверьте длину массива. Если она равна 0, сразу верните undefined.'
    ],
    commonMistakes: [
      'Инициализация максимума нулем (0). Если массив состоит только из отрицательных чисел, функция ошибочно вернет 0.',
      'Использование <= вместо < во второй части условия цикла for.'
    ],
    filePath: 'tasks/arrays/basic-iteration/solution.ts',
    testCommand: 'npx vitest tasks/arrays/basic-iteration/solution.test.ts'
  },
  {
    slug: 'array-methods-reduce',
    title: 'Агрегация данных через reduce',
    section: 'arrays',
    sectionTitle: 'Массивы и методы',
    difficulty: 'Легкий',
    statement: 'Напишите функцию sumPrices(items), которая принимает массив объектов вида { name: string, price: number } и возвращает суммарную стоимость всех товаров. Реализуйте решение с помощью встроенного метода массива reduce(). Если список пуст, верните 0.',
    expectedInputOutput: 'Вход: [{ name: "Книга", price: 350 }, { name: "Ручка", price: 50 }] => Выход: 400\nВход: [] => Выход: 0',
    constraints: 'Вы должны использовать именно метод массива reduce().',
    hints: [
      'Метод reduce принимает функцию-аккумулятор и начальное значение (второй параметр).',
      'Задайте начальное значение равным 0.',
      'Колбэк функция должна принимать аккумулятор (сумму) и текущий объект товара, и возвращать новое значение аккумулятора: accumulator + item.price.'
    ],
    commonMistakes: [
      'Забывание передать начальное значение 0. В этом случае аккумулятором на первом шаге станет весь первый объект целиком, что приведет к ошибкам конкатенации строк или NaN.',
      'Отсутствие оператора return внутри колбэк-функции метода reduce.'
    ],
    filePath: 'tasks/arrays/methods-reduce/solution.ts',
    testCommand: 'npx vitest tasks/arrays/methods-reduce/solution.test.ts'
  },
  {
    slug: 'sort-numbers-basic',
    title: 'Сортировка чисел по возрастанию',
    section: 'sort',
    sectionTitle: 'Сортировка и компараторы',
    difficulty: 'Легкий',
    statement: 'Напишите функцию sortNumbers(arr), которая сортирует массив чисел по возрастанию на месте и возвращает отсортированный массив. Защитите алгоритм от дефолтного строкового поведения sort().',
    expectedInputOutput: 'Вход: [10, 5, 2, 20, 1] => Выход: [1, 2, 5, 10, 20]',
    constraints: 'Сортировка должна осуществляться in-place (модифицировать переданный массив).',
    hints: [
      'Метод sort() без параметров преобразует числа в строки, поэтому 10 встает перед 2.',
      'Передайте функцию сравнения (компаратор) в sort: (a, b) => a - b.'
    ],
    commonMistakes: [
      'Вызов arr.sort() без передачи компаратора.',
      'Использование немутирующего метода (создание нового массива), в то время как задание требует сортировки на месте.'
    ],
    filePath: 'tasks/sort/sort-numbers/solution.ts',
    testCommand: 'npx vitest tasks/sort/sort-numbers/solution.test.ts'
  },
  {
    slug: 'sort-objects',
    title: 'Сортировка объектов по двум ключам',
    section: 'sort',
    sectionTitle: 'Сортировка и компараторы',
    difficulty: 'Средний',
    statement: 'Напишите функцию sortUsers(users), которая сортирует массив объектов { name: string, age: number } по имени (по алфавиту с поддержкой русского языка), а при совпадении имен — по возрасту (по возрастанию). Сортировка должна выполняться на месте.',
    expectedInputOutput: 'Вход: [{ name: "Иван", age: 25 }, { name: "Анна", age: 22 }, { name: "Иван", age: 20 }] => Выход: [{ name: "Анна", age: 22 }, { name: "Иван", age: 20 }, { name: "Иван", age: 25 }]',
    constraints: 'Используйте метод localeCompare() для текстового сравнения.',
    hints: [
      'Внутри компаратора сначала сравните имена: a.name.localeCompare(b.name, "ru").',
      'Если результат сравнения не равен 0, верните его.',
      'Если равен 0 (имена одинаковые), верните разницу возрастов: a.age - b.age.'
    ],
    commonMistakes: [
      'Прямое вычитание строк или использование операторов > / < для кириллицы (может давать неверный порядок в зависимости от регистра букв).',
      'Попытка отсортировать только по имени, игнорируя возраст при совпадении.'
    ],
    filePath: 'tasks/sort/sort-objects/solution.ts',
    testCommand: 'npx vitest tasks/sort/sort-objects/solution.test.ts'
  },
  {
    slug: 'to-sorted-immutable',
    title: 'Иммутабельная сортировка чисел',
    section: 'sort',
    sectionTitle: 'Сортировка и компараторы',
    difficulty: 'Легкий',
    statement: 'Напишите функцию immutableSort(arr), которая принимает массив чисел и возвращает новый массив, отсортированный по убыванию. Исходный массив не должен изменяться.',
    expectedInputOutput: 'Вход: [3, 1, 4, 2] => Выход: [4, 3, 2, 1], Исходный массив остается [3, 1, 4, 2]',
    constraints: 'Запрещено модифицировать исходный массив.',
    hints: [
      'Вы можете использовать современный метод toSorted() или сделать неглубокую копию исходного массива перед вызовом sort().',
      'Копию можно сделать через spread-оператор [...arr] или slice().',
      'Для сортировки по убыванию компаратор имеет вид (a, b) => b - a.'
    ],
    commonMistakes: [
      'Вызов sort() прямо на входном массиве, что повреждает исходные данные.',
      'Неверное направление сортировки в компараторе.'
    ],
    filePath: 'tasks/sort/to-sorted/solution.ts',
    testCommand: 'npx vitest tasks/sort/to-sorted/solution.test.ts'
  },
  {
    slug: 'bubble-sort-task',
    title: 'Реализация пузырьковой сортировки',
    section: 'algorithms',
    sectionTitle: 'Алгоритмы сортировки',
    difficulty: 'Легкий',
    statement: 'Реализуйте функцию bubbleSort(arr), которая сортирует массив чисел по возрастанию на месте с помощью алгоритма пузырьковой сортировки. Используйте флаг досрочного выхода swapped.',
    expectedInputOutput: 'Вход: [5, 1, 4, 2, 8] => Выход: [1, 2, 4, 5, 8]',
    constraints: 'Сортировка должна выполняться на месте (in-place) со сложностью O(1) по памяти.',
    hints: [
      'Внешний цикл делает проходы по массиву, внутренний цикл сравнивает соседние элементы (j и j + 1).',
      'Ограничьте внутренний цикл до j < arr.length - 1 - i, чтобы не проверять уже отсортированную правую часть.',
      'Если произошел обмен значений, установите флаг swapped в true. Если по окончании внутреннего цикла swapped равен false, прервите внешний цикл.'
    ],
    commonMistakes: [
      'Игнорирование флага swapped, что лишает алгоритм оптимизации.',
      'Выход индекса j + 1 за границы массива из-за неправильной границы цикла.'
    ],
    filePath: 'tasks/algorithms/bubble-sort/solution.ts',
    testCommand: 'npx vitest tasks/algorithms/bubble-sort/solution.test.ts'
  },
  {
    slug: 'selection-sort-task',
    title: 'Реализация сортировки выбором',
    section: 'algorithms',
    sectionTitle: 'Алгоритмы сортировки',
    difficulty: 'Легкий',
    statement: 'Реализуйте функцию selectionSort(arr), которая сортирует массив чисел по возрастанию на месте с помощью алгоритма сортировки выбором. Минимизируйте количество обменов элементов.',
    expectedInputOutput: 'Вход: [64, 25, 12, 22, 11] => Выход: [11, 12, 22, 25, 64]',
    constraints: 'In-place сортировка. Максимум 1 обмен за внешний проход.',
    hints: [
      'Во внешнем цикле (i) предполагайте, что минимальный элемент находится на индексе minIndex = i.',
      'Во внутреннем цикле (j) ищите реальный минимум в оставшейся части массива начиная с i + 1.',
      'Сделайте обмен элементов arr[i] и arr[minIndex] только после завершения внутреннего цикла и только если minIndex !== i.'
    ],
    commonMistakes: [
      'Выполнение обмена элементов внутри внутреннего цикла j, что увеличивает количество перезаписей памяти.',
      'Инициализация поиска минимума с фиксированного индекса 0 вместо текущего значения i.'
    ],
    filePath: 'tasks/algorithms/selection-sort/solution.ts',
    testCommand: 'npx vitest tasks/algorithms/selection-sort/solution.test.ts'
  },
  {
    slug: 'insertion-sort-task',
    title: 'Реализация сортировки вставками',
    section: 'algorithms',
    sectionTitle: 'Алгоритмы сортировки',
    difficulty: 'Средний',
    statement: 'Реализуйте функцию insertionSort(arr), которая сортирует массив чисел по возрастанию на месте с помощью алгоритма сортировки вставками. Сдвигайте элементы вправо через присвоение arr[j + 1] = arr[j], избегая деструктуризации swap на каждом шаге сдвига.',
    expectedInputOutput: 'Вход: [12, 11, 13, 5, 6] => Выход: [5, 6, 11, 12, 13]',
    constraints: 'Не используйте массив-копию или swap обмены внутри цикла сдвига.',
    hints: [
      'Сохраните текущий сортируемый элемент во временную переменную key = arr[i].',
      'Запустите цикл while по j = i - 1 в обратную сторону. Пока j >= 0 и arr[j] > key, выполняйте сдвиг: arr[j + 1] = arr[j].',
      'После выхода из цикла запишите сохраненный ключ в освободившуюся позицию: arr[j + 1] = key.'
    ],
    commonMistakes: [
      'Выполнение полноценного обмена [arr[j], arr[j - 1]] в цикле сдвига. Это сильно замедляет алгоритм на больших N.',
      'Забывание условия j >= 0, приводящее к обращению к отрицательному индексу.'
    ],
    filePath: 'tasks/algorithms/insertion-sort/solution.ts',
    testCommand: 'npx vitest tasks/algorithms/insertion-sort/solution.test.ts'
  },
  {
    slug: 'quick-sort-task',
    title: 'Реализация быстрой сортировки',
    section: 'algorithms',
    sectionTitle: 'Алгоритмы сортировки',
    difficulty: 'Сложный',
    statement: 'Реализуйте функцию quickSort(arr, left, right), которая сортирует массив чисел по возрастанию на месте, используя схему разделения Ломуто. Функция должна принимать границы left (по умолчанию 0) и right (по умолчанию arr.length - 1).',
    expectedInputOutput: 'Вход: [10, 7, 8, 9, 1, 5] => Выход: [1, 5, 7, 8, 9, 10]',
    constraints: 'Не выделяйте память под новые массивы. Алгоритм должен выполняться строго in-place.',
    hints: [
      'Базовое условие рекурсии: если left >= right, выполнение функции прекращается.',
      'Напишите вспомогательную функцию partition(arr, left, right), которая выбирает pivot (например, последний элемент), перераспределяет элементы и возвращает индекс опорного элемента.',
      'Вызовите quickSort рекурсивно для левой половины (от left до pivotIndex - 1) и правой половины (от pivotIndex + 1 до right).'
    ],
    commonMistakes: [
      'Попытка выделения памяти под массивы left/right и склеивание результатов через concat. Это ломает in-place характер сортировки.',
      'Бесконечная рекурсия из-за отсутствия или неверного базового условия.'
    ],
    filePath: 'tasks/algorithms/quick-sort/solution.ts',
    testCommand: 'npx vitest tasks/algorithms/quick-sort/solution.test.ts'
  },
  {
    slug: 'merge-sort-task',
    title: 'Реализация сортировки слиянием',
    section: 'algorithms',
    sectionTitle: 'Алгоритмы сортировки',
    difficulty: 'Сложный',
    statement: 'Реализуйте функцию mergeSort(arr), которая рекурсивно делит массив пополам и сливает отсортированные части в один результирующий массив.',
    expectedInputOutput: 'Вход: [38, 27, 43, 3, 9, 82, 10] => Выход: [3, 9, 10, 27, 38, 43, 82]',
    constraints: 'Временная сложность должна быть строго O(n log n). Допускается пространственная сложность O(n).',
    hints: [
      'Базовое условие: если длина массива <= 1, он уже отсортирован, верните его.',
      'Найдите середину массива mid = Math.floor(length / 2), разделите массив с помощью slice() на две половины.',
      'Рекурсивно вызовите mergeSort для левой и правой половин, после чего передайте результаты в функцию слияния merge(left, right).',
      'В функции merge используйте два указателя (индекса) для последовательного сравнения и записи элементов в результирующий буфер.'
    ],
    commonMistakes: [
      'Неверное округление при поиске середины массива, приводящее к бесконечным рекурсивным вызовам.',
      'Использование нестабильного сравнения в функции merge (забывание знака "=" в выражении left[i] <= right[j], из-за чего теряется стабильность).'
    ],
    filePath: 'tasks/algorithms/merge-sort/solution.ts',
    testCommand: 'npx vitest tasks/algorithms/merge-sort/solution.test.ts'
  },
  {
    slug: 'heap-sort-task',
    title: 'Реализация пирамидальной сортировки',
    section: 'algorithms',
    sectionTitle: 'Алгоритмы сортировки',
    difficulty: 'Сложный',
    statement: 'Реализуйте функцию heapSort(arr), которая сортирует массив чисел по возрастанию на месте с помощью алгоритма пирамидальной сортировки (двоичной кучи Max-Heap).',
    expectedInputOutput: 'Вход: [12, 11, 13, 5, 6, 7] => Выход: [5, 6, 7, 11, 12, 13]',
    constraints: 'Сортировка in-place со сложностью O(1) по памяти и O(n log n) по времени.',
    hints: [
      'Напишите функцию heapify(arr, size, i), которая опускает узел i вниз, восстанавливая свойства Max-Heap.',
      'Сначала перестройте исходный массив в кучу: начните с середины Math.floor(n / 2) - 1 и вызывайте heapify по направлению к началу.',
      'Во втором цикле от n - 1 до 1 меняйте местами первый элемент (максимум) с текущим концом, после чего вызывайте heapify для корня (0) с уменьшенным размером кучи.'
    ],
    commonMistakes: [
      'Неверный расчет индексов дочерних элементов: left = 2*i + 1, right = 2*i + 2.',
      'Попытка использовать внешнее дерево с узлами-объектами вместо математической индексации плоского массива.'
    ],
    filePath: 'tasks/algorithms/heap-sort/solution.ts',
    testCommand: 'npx vitest tasks/algorithms/heap-sort/solution.test.ts'
  },
  {
    slug: 'sort-strings-localeCompare',
    title: 'Устойчивая сортировка строк в продакшене',
    section: 'production',
    sectionTitle: 'Сортировка в реальном JavaScript',
    difficulty: 'Средний',
    statement: 'Напишите функцию safeSortStrings(arr), которая сортирует массив строк по алфавиту с использованием localeCompare (русская локаль). Массив может содержать значения null, undefined и пустые строки. Вы должны безопасно переместить все пустые/невалидные значения в самый конец отсортированного списка.',
    expectedInputOutput: 'Вход: ["Яблоко", null, "Груша", undefined, "", "Банан"] => Выход: ["Банан", "Груша", "Яблоко", "", null, undefined] (пустые и null/undefined ушли в конец)',
    constraints: 'Не используйте внешние библиотеки. Функция должна быть устойчива к ошибкам TypeError.',
    hints: [
      'Напишите компаратор. Сначала проверьте элементы на равенство null или undefined.',
      'Пустая строка "" также считается пустым элементом в рамках данного задания и должна идти в конец.',
      'Если a пустое, верните 1 (сдвигаем вправо). Если b пустое, верните -1 (сдвигаем вправо).',
      'Если оба элемента валидны, сравните их через a.localeCompare(b, "ru").'
    ],
    commonMistakes: [
      'Попытка вызвать localeCompare на значении null или undefined, что приводит к краху программы.',
      'Игнорирование пустой строки "", из-за чего она оказывается в начале списка вместо конца.'
    ],
    filePath: 'tasks/sort/sort-strings-locale/solution.ts',
    testCommand: 'npx vitest tasks/sort/sort-strings-locale/solution.test.ts'
  }
];
