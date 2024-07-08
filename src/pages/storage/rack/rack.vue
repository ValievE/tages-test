<template>
  <div class="rack">
    <h1 class="rack__title">Комплекты стеллажных систем</h1>
    <section class="catalog">
      <div class="filters" :class="{ filters_opened: isFiltersOpened }">
        <button class="filters__button" @click="isFiltersOpened = !isFiltersOpened">
          {{ isFiltersOpened ? 'Скрыть фильтры' : 'Показать фильтры' }}
        </button>
        <div
          v-for="filter in filters"
          :key="filter.id"
          v-click-outside="
            () => {
              closeSelect(filter.id);
            }
          "
          class="filter"
        >
          <h2 class="filter__title">{{ filter.name }}</h2>
          <button
            class="filter__select"
            :class="{
              filter__select_active: isSelectOpened === filter.id
            }"
            @click="openSelect(filter.id)"
          >
            {{ parseInput(filter.input, filter.id) }}
          </button>
          <div v-if="isSelectOpened === filter.id" class="filter__options">
            <button
              v-for="fValue in filter.values"
              :key="fValue.id"
              class="filter__option"
              @click="selectValue(fValue.id, filter.id)"
            >
              {{ fValue.name }}
            </button>
          </div>
        </div>
      </div>
      <div class="cards">
        <article v-for="card in actualList" :key="card.id" class="card">
          <span v-if="card.price.old_price" class="discount">Скидка</span>
          <div
            class="card__image"
            :style="{
              'background-image': setImg(card.image.url)
            }"
          ></div>
          <div class="card__labels">
            <h4 v-if="card.code" class="card__code">{{ card.code }}</h4>
            <h3 class="card__title">{{ card.name }}</h3>
          </div>
          <footer class="card__footer">
            <div class="card__prices">
              <div v-if="card.price.old_price" class="card__price card__price_disabled">
                <span class="card_price-text">{{ `${formatPrice(card.price.old_price)}₽` }}</span>
              </div>
              <div class="card__price">
                <span class="card_price-text">{{
                  `${formatPrice(card.price.current_price)}₽`
                }}</span>
              </div>
            </div>
            <div class="card__buttons">
              <button
                class="card__button"
                :style="{
                  backgroundImage: setIcon(card.id, 'cart')
                }"
                @click="addTo(card.id, 'cart')"
              ></button>
              <button
                class="card__button"
                :style="{
                  backgroundImage: setIcon(card.id, 'favorite')
                }"
                @click="addTo(card.id, 'favorite')"
              ></button>
            </div>
          </footer>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import items from '@/assets/data/items.json';
import materials from '@/assets/data/materials.json';
import { ref } from 'vue';

type ObjectList = {
  favorite: number[];
  cart: number[];
};

type FilterValue = {
  id: number;
  name: string;
};

type Filter = {
  id: number;
  name: string;
  input: number;
  function: Function;
  values: FilterValue[];
};

const objectList = ref<ObjectList>({
  cart: [],
  favorite: []
});

const actualList = ref<CatalogObject[]>([]);

const isFiltersOpened = ref<boolean>(false);

const isSelectOpened = ref<number | null>(null);

const closeSelect = (id: number) => {
  if (isSelectOpened.value === id) {
    isSelectOpened.value = null;
  }
};

const button = {
  cart: {
    active: '/img/icons/icon_cart_active.svg',
    default: '/img/icons/icon_cart.svg'
  },
  favorite: {
    active: '/img/icons/icon_fav_active.svg',
    default: '/img/icons/icon_fav.svg'
  }
};

const getData = () => {
  const loadedItems: CatalogObject[] = items.map((item) => {
    const numericID = Number(item.id);
    return { ...item, id: numericID };
  });
  return loadedItems;
};

actualList.value = getData();

const openSelect = (arg: number) => {
  isSelectOpened.value = isSelectOpened.value === arg ? null : arg;
  return isSelectOpened.value;
};

const formatPrice = (arg: number | null): number | null => {
  if (arg) {
    const newValue = Math.floor(arg);
    return newValue;
  }
  return null;
};

const filterByPrice = (list: CatalogObject[], arg: number): CatalogObject[] => {
  if (arg === 1) {
    list.sort(
      (firstItem, secondItem) => firstItem.price.current_price - secondItem.price.current_price
    );
  }

  if (arg === 2) {
    list.sort(
      (firstItem, secondItem) => secondItem.price.current_price - firstItem.price.current_price
    );
  }
  return list;
};

const filterByMaterial = (list: CatalogObject[], arg: number): CatalogObject[] => {
  if (!arg) {
    return list;
  }
  const updatedList = list.filter((item) => item.material === arg);
  return updatedList;
};

const filters = ref<Filter[]>([
  {
    id: 0,
    name: 'Сортировать по:',
    input: 0,
    function: filterByPrice,
    values: [
      {
        id: 0,
        name: 'По-умолчанию'
      },
      {
        id: 1,
        name: 'Цена по возрастанию'
      },
      {
        id: 2,
        name: 'Цена по убыванию'
      }
    ]
  },
  {
    id: 1,
    name: 'Материал',
    function: filterByMaterial,
    input: 0,
    values: [
      {
        id: 0,
        name: 'Любой'
      }
    ]
  }
]);

const acceptFilters = () => {
  const newActualList = ref<CatalogObject[]>(getData());

  filters.value.forEach((filter) => {
    newActualList.value = filter.function(newActualList.value, filter.input);
  });

  actualList.value = newActualList.value.slice(0);
  return actualList.value;
};

const selectValue = (value: number, id: number) => {
  filters.value[id].input = value;
  isSelectOpened.value = null;
  acceptFilters();
};

const parseInput = (value: number, id: number) => {
  const newObject = filters.value[id].values[value].name;
  return newObject;
};

const addMaterialFilters = () => {
  materials.forEach((material) => {
    const newItem: FilterValue = {
      id: Number(material.id),
      name: material.name
    };
    filters.value[1].values.push(newItem);
  });
};

addMaterialFilters();

const setIcon = (index: number, list: 'favorite' | 'cart'): string => {
  if (objectList.value[list].includes(index)) {
    return `url('${button[list].active}')`;
  }
  return `url('${button[list].default}')`;
};

const setImg = (url: string): string => {
  return `url('/img/cards${url}')`;
};

const addTo = (index: number, list: 'cart' | 'favorite') => {
  if (objectList.value[list].includes(index)) {
    objectList.value[list] = objectList.value[list].filter((number) => number !== index);
    localStorage.setItem('objectList', JSON.stringify(objectList.value));
    return objectList.value;
  }
  objectList.value[list].push(index);
  localStorage.setItem('objectList', JSON.stringify(objectList.value));
  return objectList.value;
};

const checkData = () => {
  const localData = localStorage.getItem('objectList');
  if (localData) {
    const localObjectList: ObjectList = JSON.parse(localData);
    objectList.value = Object.assign(localObjectList);
  }
  return objectList.value;
};

checkData();
</script>

<style src="./rack.css" scoped />
