import {
  BedIcon,
  CalendarCheckIcon,
  LogOut,
  UserPlus,
} from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDashboardSummery,
  getPaymentSummery,
} from "../../app/features/auth/authSlice";

export default function StatsOverview() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboardSummery());
    dispatch(getPaymentSummery());
  }, [dispatch]);

  const { paymentSummery, dashboardSummery } = useSelector((store) => store.auth);

  const occupancyRate = dashboardSummery?.occupancyRate ?? 76;
  const reservationCount = dashboardSummery?.reservationCount ?? 38;
  const checkins = dashboardSummery?.checkInCount ?? 27;
  const checkouts = dashboardSummery?.checkOutCount ?? 22;

  const totalAmount = paymentSummery?.totalAmount ?? 0;
  const paidAmount = paymentSummery?.paidAmount ?? 0;
  const remainingAmount = paymentSummery?.remainingAmount ?? 0;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      {/* Occupancy Rate + Total Payment */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
              <BedIcon className="text-blue-600 text-xl h-5 w-5" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-slate-500 truncate">Occupancy Rate</dt>
                <dd>
                  <div className="text-lg font-semibold text-slate-900">{occupancyRate}%</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-slate-50 px-5 py-3">
          <div className="text-sm text-slate-600">
            <span>Total Payment: Rs. {totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Reservations + Paid */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-emerald-100 rounded-md p-3">
              <CalendarCheckIcon className="text-emerald-600 text-xl h-5 w-5" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-slate-500 truncate">Reservations (Today)</dt>
                <dd>
                  <div className="text-lg font-semibold text-slate-900">{reservationCount}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-slate-50 px-5 py-3">
          <div className="text-sm text-slate-600">
            <span>Paid: Rs. {paidAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Check-ins + Remaining */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-amber-100 rounded-md p-3">
              <UserPlus className="text-amber-600 text-xl h-5 w-5" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-slate-500 truncate">Check-ins Today</dt>
                <dd>
                  <div className="text-lg font-semibold text-slate-900">{checkins}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-slate-50 px-5 py-3">
          <div className="text-sm text-slate-600">
            <span>Remaining: Rs. {remainingAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Check-outs Today (no payment info) */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
              <LogOut className="text-red-600 text-xl h-5 w-5" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-slate-500 truncate">Check-outs Today</dt>
                <dd>
                  <div className="text-lg font-semibold text-slate-900">{checkouts}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-slate-50 px-5 py-3">
          <div className="text-sm text-slate-600">
            <span >b</span>
          </div>
        </div>
      </div>
    </div>
  );
}
