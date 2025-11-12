import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { getBillingColumns } from "./billingColumns";
import Billing from "@/entities/billing.model";
import { DataTable } from "@/components/dataTable";
import { useBillingContext } from "@/context/BillingContext";
import { BillingStatus } from "@/entities/billingStatus.enum";
import { Payment } from "@/entities/payment.enum";
import BillingService from "@/services/billing.service";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { usePatientContext } from "@/context/PatientContext";
import { useAppointmentContext } from "@/context/AppointmentContext";
import { useDepartmentContext } from "@/context/DepartmentContext";
import { useMedicalServiceContext } from "@/context/MedicalServiceContext";
import { useEntityMap } from "@/hooks/useEntityMap";

const service = new BillingService();

export const BillingPage: React.FC = () => {
  const {
    billings: data,
    loadingBilling,
    errorBilling,
    fetchBillings,
    refetchBillings,
  } = useBillingContext();

  const { patients } = usePatientContext();
  const { appointments } = useAppointmentContext();
  const { departments } = useDepartmentContext();
  const { medicalServices } = useMedicalServiceContext();

  // Edit dialog state
  const [editOpen, setEditOpen] = useState(false);
  const [selectedBilling, setSelectedBilling] = useState<Billing | null>(null);

  // Delete confirmation state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form states
  const [patientId, setPatientId] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState<BillingStatus | "">("");
  const [paymentMethod, setPaymentMethod] = useState<Payment | "">("");

  useEffect(() => {
    fetchBillings();
  }, [fetchBillings]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = {
      patientId,
      departmentId,
      appointmentId,
      serviceId,
      amount,
      status: status as BillingStatus,
      paidAt: new Date(),
      paymentMethod,
    };

    const model = Billing.fromJsonModel(formData);

    if (selectedBilling) {
      // Update
      await service.updateBilling(selectedBilling.id, model);
    } else {
      // Create
      await service.addBilling(model);
    }

    await refetchBillings();
    setEditOpen(false);
    setSelectedBilling(null);

    // Clear form
    setPatientId("");
    setDepartmentId("");
    setAppointmentId("");
    setStatus("");
    setServiceId("");
    setAmount(0);
    setPaymentMethod("");
  }

  async function handleEdit(billing: Billing) {
    setSelectedBilling(billing);
    setEditOpen(true);
  }

  async function handleDelete(id: string) {
    setDeleteId(id);
    setDeleteOpen(true);
  }

  const columns = getBillingColumns(handleEdit, handleDelete);

  const patientsMap = useEntityMap(patients, "id", "fullName");
  const appointmentsMap = useEntityMap(appointments, "id", "notes");
  const departmentsMap = useEntityMap(departments, "id", "name");
  const servicesMap = useEntityMap(medicalServices, "id", "name");

  const enrichedData = React.useMemo(() => {
    return data.map((a) => ({
      ...a,
      patientName: patientsMap[a.patientId] ?? a.patientId,
      appointmentName: appointmentsMap[a.appointmentId!] ?? a.appointmentId,
      departmentName: departmentsMap[a.departmentId] ?? a.departmentId,
      serviceName: servicesMap[a.serviceId] ?? a.serviceId,
    }));
  }, [data, patientsMap, appointmentsMap, departmentsMap, servicesMap]);

  // Populate edit form when selectedBilling changes
  useEffect(() => {
    if (!selectedBilling) {
      // Clear form for create
      setPatientId("");
      setDepartmentId("");
      setAppointmentId("");
      setStatus("");
      setServiceId("");
      setAmount(0);
      setPaymentMethod("");
      return;
    }

    // Populate for edit
    setPatientId(selectedBilling.patientId);
    setDepartmentId(selectedBilling.departmentId);
    setAppointmentId(selectedBilling.appointmentId || "");
    setServiceId(selectedBilling.serviceId);
    setAmount(selectedBilling.amount);
    setStatus(selectedBilling.status);
    setPaymentMethod(selectedBilling.paymentMethod);
  }, [selectedBilling]);

  async function confirmDelete() {
    if (!deleteId) return;
    await service.deleteBilling(deleteId);
    await refetchBillings();
    setDeleteOpen(false);
    setDeleteId(null);
  }

  if (loadingBilling) {
    return <div className="p-4 text-gray-500">Cargando facturas...</div>;
  }

  if (errorBilling) {
    return <div className="p-4 text-red-600">Error: {errorBilling}</div>;
  }

  return (
    <div className="bg-white rounded-2xl items-start justify-start flex flex-col gap-2 p-4">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <p className="text-[#0f172a] text-[1.25rem] leading-7">Facturación</p>
        </div>
        <div>
          <Button
            onClick={() => {
              setSelectedBilling(null);
              setEditOpen(true);
            }}
            className="bg-sky-600 text-white"
          >
            Nueva factura
          </Button>
        </div>
        {/* Edit dialog  */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent
            className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>
                  {selectedBilling ? "Editar factura" : "Nueva factura"}
                </DialogTitle>
                <DialogDescription>
                  {selectedBilling
                    ? "Actualiza los datos de la factura seleccionada."
                    : "Ingresa los datos para la nueva factura."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <label htmlFor="editPatientId">Paciente</label>
                  <Input
                    id="editPatientId"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="editDepartmentId">Departamento</label>
                  <Input
                    id="editDepartmentId"
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="appointmentId">Cita</label>
                  <Input
                    id="appointmentId"
                    value={appointmentId}
                    onChange={(e) => setAppointmentId(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="editStatus">Estado</label>
                  <select
                    id="editStatus"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as BillingStatus)}
                    className="border rounded-md p-2"
                  >
                    {Object.values(BillingStatus).map((statusOption) => (
                      <option key={statusOption} value={statusOption}>
                        {statusOption.charAt(0) +
                          statusOption.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-3">
                  <label htmlFor="editService">Servicio:</label>
                  <Input
                    id="editService"
                    type="text"
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="editAmount">Monto:</label>
                  <Input
                    className="border border-gray-400 p-2"
                    id="editAmount"
                    type="number"
                    value={amount === 0 ? "" : amount}
                    min={0}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="editStatus">Metodo de pago</label>
                  <select
                    id="editPaymethod"
                    value={paymentMethod}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value as Payment)
                    }
                    className="border rounded-md p-2"
                  >
                    {Object.values(Payment).map((statusOption) => (
                      <option key={statusOption} value={statusOption}>
                        {statusOption.charAt(0) +
                          statusOption.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <DialogFooter className="pt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="bg-sky-600 text-white">
                  Guardar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete confirmation dialog  */}
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Confirmar eliminación</DialogTitle>
              <DialogDescription>
                ¿Estás seguro que deseas eliminar esta factura? Esta acción no
                se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button variant="destructive" onClick={confirmDelete}>
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-3 gap-2 w-full h-24">
        <div className="border border-gray-300 rounded-2xl text-left flex flex-col gap-2 p-4">
          <span className="text-[#475569] ">Total facturado este mes</span>
          <span className="font-semibold text-[1.5rem]">C$1000</span>
        </div>
        <div className="border border-gray-300 rounded-2xl text-left flex flex-col gap-2 p-4">
          <span className="text-[#475569] ">Pendiente</span>
          <span className="font-semibold text-[1.5rem]">C$150</span>
        </div>
        <div className="border border-gray-300 rounded-2xl text-left flex flex-col gap-2 p-4">
          <span className="text-[#475569] ">Pagado</span>
          <span className="font-semibold text-[1.5rem]">C$1800</span>
        </div>
      </div>
      {/* table */}
      <div className="mt-6 w-full">
        <DataTable
          columns={columns}
          data={enrichedData as unknown as Billing[]}
          filterColumn="serviceName"
          filterPlaceholder="Filtrar por servicios..."
        />
      </div>
    </div>
  );
};

export default BillingPage;
