"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { deleteUserFromCompany, fetchUsersInCompany, updateUserRole } from "@/lib/slices/companySlice";
import { RootState } from "@/lib/store";
import { Role } from "@/lib/types"; // Предположительно тип Role будет экспортироваться из какого-то файла

const EmployeesPage = () => {
    const dispatch = useDispatch();
    const {users, loading, error} = useSelector((state: RootState) => state.company);
    const {
      data: userProfile,
      loading: profileLoading,
      error: profileError
    } = useSelector((state: RootState) => state.profile);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [newRole, setNewRole] = useState<Role>(Role.EMPLOYEE);
    const [userToDelete, setUserToDelete] = useState<any>(null); // Для хранения пользователя, которого нужно удалить

    const companyId = userProfile?.company?.id; // Получаем companyId из профиля пользователя

    useEffect(() => {
      if (companyId) {
        // Получаем пользователей компании при монтировании компонента, если companyId существует
        dispatch(fetchUsersInCompany(companyId) as any);
      }
    }, [dispatch, companyId]);

    const handleRoleChange = (userId: number, newRole: Role) => {
      if (companyId) {
        dispatch(updateUserRole({companyId, userId, role: newRole}) as any)
          .then(() => {
            toast.success("Роль обновлена!");
          })
          .catch((error: any) => {
            toast.error("Ошибка при изменении роли!");
            console.error(error);
          });
      }
    };

    const handleDeleteUser = (userId: number) => {
      if (companyId) {
        dispatch(deleteUserFromCompany({companyId, userId}) as any)
          .then(() => {
            toast.success("Пользователь удалён!");
          })
          .catch((error: any) => {
            toast.error("Ошибка при удалении пользователя!");
            console.error(error);
          });
      }
    }

    const handleOpenDialog = (user: any) => {
      setSelectedUser(user);
      setNewRole(user.role); // Устанавливаем текущую роль пользователя в состояние
    };

    const handleOpenDeleteDialog = (user: any) => {
      setUserToDelete(user); // Устанавливаем пользователя для удаления
    };

    if (profileLoading) return <p>Загрузка профиля...</p>;
    if (profileError) return <p className="text-red-500">{profileError}</p>;

    return (
      <div className="flex w-full flex-col p-5">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-2xl font-medium py-3 leading-10 tracking-normal">Сотрудники компании</h2>
        </div>

        <div className="w-full flex flex-col gap-3">
          {loading && <p>Загрузка...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {users && users.map((user: any) => (
            <div key={user.id}
                 className="p-3 w-full rounded-[20px] flex items-center bg-[#FEF7FF] justify-between hover:outline-1 hover:outline-[#79747E]/30">
              <div className="flex gap-2 items-center">
                <div className="flex flex-col">
                  <h3 className="text-lg font-medium">{user.firstName} {user.lastName}</h3>
                  <p className="text-md">{user.role}</p>
                </div>
              </div>
              {userProfile.role === "super_manager" && <div className={"flex items-center gap-3"}>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-1 rounded-full" onClick={() => handleOpenDialog(user)}>
                      Редактировать роль
                    </Button>
                  </DialogTrigger>

                  {selectedUser && selectedUser.id === user.id && (
                    <DialogContent className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
                                   onClick={(e) => e.stopPropagation()}>
                      <div className="bg-white rounded-xl p-8 w-full max-w-lg space-y-4">
                        <DialogClose
                          className="cursor-pointer border rounded-full w-7 h-7 flex items-center justify-center"
                          asChild>
                          <Button variant="ghost" className=" text-gray-500 hover:text-gray-700">X</Button>
                        </DialogClose>
                        <DialogTitle className="text-xl font-semibold text-center">Редактирование роли</DialogTitle>
                        <DialogDescription className="text-sm text-gray-600 text-center">
                          Выберите новую роль для {user.firstName} {user.lastName}
                        </DialogDescription>

                        <div className="flex flex-col gap-4">
                          <select value={newRole} onChange={(e) => setNewRole(e.target.value as Role)}
                                  className="border px-3 py-2 rounded w-full">
                            <option value={Role.ADMIN}>Администратор</option>
                            <option value={Role.SUPER_MANAGER}>Супер менеджер</option>
                            <option value={Role.MANAGER}>Менеджер</option>
                            <option value={Role.EMPLOYEE}>Сотрудник</option>
                          </select>

                          <div className="flex gap-4 justify-center">
                            <DialogClose asChild>
                              <Button
                                className="w-48"
                                onClick={() => handleRoleChange(user.id, newRole)}
                              >
                                Обновить роль
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button variant="ghost" className="w-48">
                                Отменить
                              </Button>
                            </DialogClose>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  )}
                </Dialog>
                {/* Удаление пользователя */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-1 rounded-full text-red-500"
                            onClick={() => handleOpenDeleteDialog(user)}>
                      Удалить
                    </Button>
                  </DialogTrigger>

                  {userToDelete && userToDelete.id === user.id && (
                    <DialogContent className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
                                   onClick={(e) => e.stopPropagation()}>
                      <div className="bg-white rounded-xl p-8 w-full max-w-lg space-y-4">
                        <DialogClose
                          className="cursor-pointer border rounded-full w-7 h-7 flex items-center justify-center"
                          asChild>
                          <Button variant="ghost" className=" text-gray-500 hover:text-gray-700">X</Button>
                        </DialogClose>
                        <DialogTitle className="text-xl font-semibold text-center">Удаление пользователя</DialogTitle>
                        <DialogDescription className="text-sm text-gray-600 text-center">
                          Вы уверены, что хотите удалить {user.firstName} {user.lastName} из компании?
                        </DialogDescription>

                        <div className="flex gap-4 justify-center">
                          <DialogClose asChild>
                            <Button
                              className="w-48"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              Удалить
                            </Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button variant="ghost" className="w-48">
                              Отменить
                            </Button>
                          </DialogClose>
                        </div>
                      </div>
                    </DialogContent>
                  )}
                </Dialog>
              </div>}

            </div>
          ))}
        </div>
      </div>
    );
  }
;

export default EmployeesPage;
