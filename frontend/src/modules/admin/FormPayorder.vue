<template>
  <form action="" @submit="handleSubmit">
    <div class="mt-6 grid grid-cols-2 gap-x-4 gap-y-4">
      <div class="grid items-center">
        <Label for="detail">Razon</Label>
        <Input
          id="reason"
          type="text"
          placeholder="Razon de orden de pago"
          v-model="v$.reason.$model"
        />
        <Error :errors="v$.reason.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="detail">Detalle</Label>
        <Input
          id="detail"
          type="text"
          placeholder="Detalle de la orden de pago"
          v-model="v$.detail.$model"
        />
        <Error :errors="v$.detail.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="operator">Operador</Label>
        <Select id="operator" v-model="v$.operatorId.$model">
          <SelectTrigger class="">
            <SelectValue placeholder="Seleccione un operador" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Operadores</SelectLabel>
              <SelectItem
                v-for="operator in operatorStore.operators"
                :key="operator.id"
                :value="operator.id"
              >
                {{ operator.businessName }}</SelectItem
              >
            </SelectGroup>
          </SelectContent>
        </Select>
        <Error :errors="v$.operatorId.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="amountExtra">Monto extra(Bs)</Label>
        <Input id="amountExtra" type="number" v-model="v$.amountExtra.$model" />
        <Error :errors="v$.amountExtra.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="detailExtra">Razon de monto Extra</Label>
        <Input
          id="detailExtra"
          type="text"
          placeholder="Razon de monto Extra"
          v-model="v$.detailExtra.$model"
        />
        <Error :errors="v$.detailExtra.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="typePayorderId">Tipo de orden de pago</Label>
        <Select id="typePayorderId" v-model="selectedItem">
          <SelectTrigger class="">
            <SelectValue placeholder="Seleccione un tipo de orden de pago" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tipos de ordenes</SelectLabel>
              <SelectItem
                v-for="typePayorder in typePayorderStore.typePayorders"
                :key="typePayorder.id"
                :value="typePayorder.id"
              >
                {{ typePayorder.name }} - {{ typePayorder.amount }} Bs.
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button type="button" class="mt-2" @click="addItem">Agregar</Button>
      </div>

      <div class="grid items-center col-span-2">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Nombre</th>
              <th scope="col" class="px-6 py-3">Precio</th>
              <th scope="col" class="px-6 py-3">Cantidad</th>
              <th scope="col" class="px-6 py-3">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in addedItems"
              :key="index"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td class="px-6 py-4">{{ item.name }}</td>
              <td class="px-6 py-4">{{ item.amount }}</td>
              <td class="px-6 py-4"><input type="number" v-model="item.count" min="0" /></td>
              <td class="px-6 py-4">{{ item.amount * item.count }}</td>
              <td class="px-6 py-4">
                <Button type="button" v-on:click="addedItems.splice(index, 1)">Quitar</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex justify-between mt-4">
      <router-link to="/payorder">
        <Button type="button" variant="destructive"
          ><v-icon name="fa-times" class="mr-2" />Salir</Button
        >
      </router-link>
      <Button class=""><v-icon name="fa-save" type="submit" />Guardar</Button>
    </div>
  </form>
</template>
<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/commun/ui/select'
import Input from '@/commun/ui/input/Input.vue'
import Label from '@/commun/ui/label/Label.vue'
import Error from '@/commun/me/ErrorBase.vue'
import Button from '@/commun/ui/button/Button.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { reactive, ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { usePayorderStore } from '@/stores/payorder.stores'
import { useOperatorStore } from '@/stores/operator.stores'
import { useTypePayorderStore } from '@/stores/typePayorder.stores'
const typePayorderStore = useTypePayorderStore()
const operatorStore = useOperatorStore()
const payorderStore = usePayorderStore()
const toast = useToast()
const router = useRouter()
const route = useRoute()
const formData = reactive({
  detail: '',
  operatorId: '',
  amountExtra: 0,
  detailExtra: '',
  reason: ''
})
const selectedItem = ref('')
const addedItems = reactive([])

const rules = computed(() => ({
  detail: { required: helpers.withMessage('Campo requerido', required) },
  operatorId: { required: helpers.withMessage('Campo requerido', required) },
  reason: { required: helpers.withMessage('Campo requerido', required) },
  //no required
  amountExtra: {},
  detailExtra: {}
}))

const v$ = useVuelidate(rules, formData)
try {
  operatorStore.getOperators()
} catch (error) {
  toast.error('Error al cargar los operadores')
}
try {
  typePayorderStore.getTypePayorders()
} catch (error) {
  toast.error('Error al cargar los tipos de ordenes de pago')
}

async function handleSubmit(e) {
  if (e) e.preventDefault()
  const isFormCorrect = await v$.value.$validate()
  if (isFormCorrect) {
    try {
      if (addedItems.length === 0) {
        toast.error('Debe agregar al menos un tipo de orden de pago')
        return
      }
      // array detailPayorders
      formData.detailPayorders = addedItems
      if (!route.query.id) await payorderStore.createPayorder(formData)
      else await payorderStore.updatePayorder(route.query.id, formData)
      toast.success('Orden de pago guardada')
      router.push({ name: 'payorder' })
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
}


function addItem() {
  if (selectedItem.value) {
    const item = addedItems.find((item) => item.serviceId === selectedItem.value)
    if (item) {
      item.count++
    } else {
      const typePayorder = typePayorderStore.typePayorders.find(
        (typePayorder) => typePayorder.id === selectedItem.value
      )
      addedItems.push({
        serviceId: typePayorder.id,
        name: typePayorder.name,
        amount: typePayorder.amount,
        count: 1
      })
    }
    selectedItem.value = ''
  }
}

onMounted(async () => {
  if (route.query.id) {
    try {
      await payorderStore.getPayorder(route.query.id)
      console.log(payorderStore.payorder)
      formData.reason = payorderStore.payorder.reason
      formData.detail = payorderStore.payorder.detail
      formData.operatorId = payorderStore.payorder?.operator.id
      formData.amountExtra = payorderStore.payorder?.amountExtra
      formData.detailExtra = payorderStore.payorder?.detailExtra
      // array detailPayorders
      addedItems.push(...payorderStore.payorder.detailPayorders)
    } catch (error) {
      console.log(error)
    }
  }
})
</script>
